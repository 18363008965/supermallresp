<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import bScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new bScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.实时的监听滚动的位置信息，添加判断，只有当probeType的值为2或者3的时候才会监听滚动的位置信息
      if(this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        })
      }

      //3.上拉加载更多，添加判断，当pullUpLoad的值为true时，才会进行上拉加载更多操作
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      //实时滚动的位置，通过这个来控制回到顶部图标是否显示
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y , time);
      },
      finishPullUp(){
        //上拉加载更多最后的刷新操作
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY(){
        //获取滚动的Y轴的值
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
