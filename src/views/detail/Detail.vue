<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="loadMore"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";

  import Scroll from "../../components/common/scroll/Scroll";

  import {debounce} from "../../common/utils";

  import {itemImgListenerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    mixins: [itemImgListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopY: null
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid获取详情数据
      getDetail(this.iid).then(res => {
        //1.请求轮播图中要显示的图片数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        //4.获取详情数据
        this.detailInfo = data.detailInfo;

        //5.获取详情的参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.保存评论数据
        if(data.rate.list){
          this.commentInfo = data.rate.list[0];
        }
      });
      //2.获取推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      })

      //3.为themeTopYs赋值，此处必须在所有的数据以及图片加载完成以后在来获取元素的offSetTop的值，不然元素加载不完所获取的offSetTop的值不正确
      //为了提高性能，重复多次的来获取，此处使用了防抖函数使得offTopSet的值只获取一次即可。
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },100);
    },
    destroyed() {
      //取消图片加载的监听事件
      this.$bus.$off(this.itemImgListener);
    },
    mounted() {
    },
    methods: {
      loadMore() {
        //刷新，拉下加载更多
        this.$refs.scroll.refresh();
        //调用点击tabControl标题点击事件的赋值函数
        this.getThemeTopY();
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
