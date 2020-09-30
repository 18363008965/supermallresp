<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import {getDetail} from "../../network/detail";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      //1.请求轮播图中要显示的图片数据
      getDetail(this.iid).then(res => {
        //打印请求过来的数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
      });
    }
  }
</script>

<style scoped>

</style>
