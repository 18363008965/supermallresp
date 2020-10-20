import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

const mutations = {
  //一般mutations中实现的都是单一的操作，复杂的操作和异步的操作需要放到actions中进行实现
  //将商品数量加一
  [ADD_COUNTER](state, payload) {
    payload.count++ ;
  },
  //将新商品添加到购物车中
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
}

export default mutations;
