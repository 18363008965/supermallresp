<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import {getDetail, Goods} from "../../network/detail";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
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
      });
    }
  }
</script>

<style scoped>

</style>
