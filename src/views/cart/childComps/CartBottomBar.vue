<template>
  <div class="bottom-menu">
    <check-button class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去支付({{buyLength}})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters([
        'cartList',
        'cartLength'
      ]),
      totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0).toFixed(2)
      },
      buyLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        //首先判断一下如果购物车中没有商品，那么不应该显示全选中状态，当有商品时才显示全选中状态
        if (this.cartList.length == 0) return false;
          return this.cartList.find(item => item.checked === false) === undefined;
      }
    },
    methods: {
      checkBtnClick() {
        //1.判断是否有未选中的商品
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        //2.如果有为选中的商品，那么全都选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          })
        }
      },
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
