<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行','新款','流行']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    <ul>
      <li>1111</li>
      <li>1111</li>
      <li>1111</li>
      <li>1111</li>
      <li>1111</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import { getHomeMultidata, getHomeGoods } from "../../network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
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
        currentType: 'pop', //传入商品数据的类型的初始值，初始值为pop
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      //2.获取商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

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
        })
      },


    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;

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
</style>
