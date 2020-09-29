<template>
  <div id="home" class="wrapper">
    <!--导航栏-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--新增一个tabcontrol控制选项卡组件，用于在滚动时的吸顶效果的占位-->
    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
    <!--scroll是滚动效果组件-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--商品轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐商品-->
      <recommend-view :recommends="recommends"/>
      <!--本周流行-->
      <feature-view/>
      <!--商品分类切换控制栏-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"/>
      <!--商品展示-->
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import { getHomeMultidata, getHomeGoods } from "../../network/home";
  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        },
        currentType: 'pop', //传入商品数据的类型的初始值，初始值为pop,
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      //2.获取商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      //3.图片加载完成监听事件
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('itemImageLoad', () => {
        //最后进行刷新图片的高度
        refresh();
      });
    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }

        //将两个tabControl的点击时的index保持一致，使其都等于当前点击的index的值
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        //实时监听滚动的位置
        this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
        //1.回到顶部图标是否显示
        this.isShowBackTop = (-position.y) > 1000;

        //2.决定tabControl是否吸顶（即position：fixed是否是这个属性）
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore(){
        //上拉加载更多也就是再一次的请求商品数据
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /*
      * 网络请求相关的方法
      * */
      //请求多个数据方法的实现
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      //获取商品数据
      getHomeGoods(type) {
        //将当前类型的page页数加1
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //将获取的数据添加到上面定义的goods的list中。由于此处的接口出现了问题，无法返回数据，因此代码是对的，数据问题导致错误！！！
          this.goods[type].list.push(...res.data.list);
          //将页数加一
          this.goods[type].page += 1;
          //最后将上拉加载更多进行刷新，从而加载更多的数据
          this.$refs.scroll.finishPullUp();
        })
      },

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
</style>
