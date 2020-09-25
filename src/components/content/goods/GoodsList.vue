<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods:{
        type: Array,
        default(){
          return []
        }
      }
    }

  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap; /*该属性可以使之前多个元素在flex布局中呈均等分显示*/
    justify-content: space-around;/*该属性可以使用多个元素在flex布局中左右两边以及中间之间的间隔是均等划分*/
    padding: 2px;
  }
</style>
