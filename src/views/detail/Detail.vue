<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="loadMore"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommend"/>
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

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: []
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
    },
    methods: {
      loadMore() {
        this.$refs.scroll.refresh();
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
