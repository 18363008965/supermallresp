<template>
  <div id="home" class="wrapper">
    <!--导航栏-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--scroll是滚动效果组件-->
    <scroll class="content" ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--商品轮播图-->
      <home-swiper :banners="banners"/>
      <!--推荐商品-->
      <recommend-view :recommends="recommends"/>
      <!--本周流行-->
      <feature-view/>
      <!--商品分类切换控制栏-->
      <tab-control :titles="['流行','新款','流行']" class="tab-control" @tabClick="tabClick"/>
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
        isShowBackTop: false
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      //2.获取商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

      //3.图片加载完成监听事件
      this.$bus.$on('itemImageLoad', () => {
        //最后进行刷新图片的高度
        this.$refs.scroll.refresh();
      })
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
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
      },
      backClick() {
        //实时监听滚动的位置
        this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
        //回到顶部图标是否显示
        this.isShowBackTop = (-position.y) > 1000;
      },
      loadMore(){
        //上拉加载更多也就是再一次的请求商品数据
        this.getHomeGoods(this.currentType);
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

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky; /*该属性可以实现页面中的滚动效果，但是在使用scroll框架就不在适用*/
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
