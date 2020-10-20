/*
* vuex配置文件
* */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from "./actions";
import mutations from "./mutations";

//1.注册vuex
Vue.use(Vuex);

//2.创建vuex实例
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});

//3.导出vuex
export default store;
