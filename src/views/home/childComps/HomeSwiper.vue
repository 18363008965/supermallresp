<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        //监听图片加载完成以后，往首页中发射事件以此来获取滚动的offetTop的值
        if(!this.isLoad){
          //使用isLoad变量来控制防止多次发射事件。使其只发射一次
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }

      }
    }
  }
</script>

<style scoped>

</style>
