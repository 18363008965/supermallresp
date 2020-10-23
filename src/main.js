import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//事件总线vue实例的创建
Vue.prototype.$bus = new Vue();

Vue.use(Toast);

//解决移动端的点击时延迟300毫秒的问题
FastClick.attach(document.body);

//图片延迟加载，这是可选项，有些公司不要求懒加载，此处在GoodsListItem组件中使用的即：v-lazy="showMessage"
Vue.use(LazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
