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

      //2.实时的监听滚动的位置信息
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })

      //3.上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
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
      }
    }
  }
</script>

<style scoped>

</style>
