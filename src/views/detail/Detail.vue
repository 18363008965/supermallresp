<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="loadMore"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast ref="toast"></toast>
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
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import Toast from "../../components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";

  import Scroll from "../../components/common/scroll/Scroll";

  import {debounce} from "../../common/utils";

  import {itemImgListenerMixin, backTopMixin} from "../../common/mixin";

  import {mapActions} from 'vuex';

  export default {
    name: "Detail",
    mixins: [itemImgListenerMixin, backTopMixin],
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
        getThemeTopY: null,
        currentIndex: 0
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
      Scroll,
      DetailBottomBar,
      Toast
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid获取详情数据
      getDetail(this.iid).then(res => {
        //1.请求轮播图中要显示的图片数据
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
        //为themeTopYs赋值一个number类型的最大值
        this.themeTopYs.push(Number.MAX_VALUE)
      },100);
    },
    destroyed() {
      //取消图片加载的监听事件
      this.$bus.$off(this.itemImgListener);
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'addCart'
      ]),
      loadMore() {
        //刷新，拉下加载更多
        this.$refs.scroll.refresh();
        //调用点击tabControl标题点击事件的赋值函数
        this.getThemeTopY();
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        //1.回到顶部图标是否显示
        this.isShowBackTop = (-position.y) > 1000;

        //2.监听滚动的位置，进行赋值，使其滚动到某一个位置时显示对应的标题
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          //此处有三种条件判断方式
          //方式一，直接进行判断
          /*if (this.currentIndex != i &&
            ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
              || (i == length - 1 && positionY >= this.themeTopYs[i]))) {
              //进行赋值
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
          }*/

          //方式二：给themeTopYs赋值一个int类型的最大值，之后在进行比较，直接比较i在某一个区间内的值即：
          if (this.currentIndex !=i &&
            (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

      },
      addToCart() {
        //1.获取加入购物车的数据
        const obj = {};
        obj.iid = this.iid;
        obj.image = this.topImages[0];
        obj.title = this.goods.title;
        obj.desc = this.goods.desc;
        obj.price = this.goods.realPrice;

        //2.将购物车数据添加到vuex中，方式一
        // this.$store.dispatch('addCart', obj).then(res => {
        //   console.log(res);
        // })

        //2.将购物车数据添加到vuex中，方式二
        this.addCart(obj).then(res => {
          //console.log(res);
          //进行弹窗显示
          this.$toast({message: '加入购物车成功'})
        })
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
    height: calc(100% - 44px - 49px);
  }
</style>
