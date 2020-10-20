import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";
const actions = {
  //异步和复杂的操作
  addCart(context, payload) {
    //判断原来的商品数组中是否含有此商品，有就将数量加一，没有就将新商品加入到商品数组中且数量为1
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    if(oldProduct) {
      //说明有次商品，数量加一
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  }

}
 export default actions;
