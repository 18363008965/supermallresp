/*
* 混入的js文件
* */
import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

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

//点击回到顶部空间的混入代码
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backClick() {
      //实时监听滚动的位置
      this.$refs.scroll.scrollTo(0,0);
    }
  }
}
