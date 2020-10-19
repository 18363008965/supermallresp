/*
* 混入的js文件
* */
import {debounce} from "./utils";

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    //3.图片加载完成监听事件
    const refresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemImgListener = () => {
      //最后进行刷新图片的高度
      refresh();
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}
