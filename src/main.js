import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

//事件总线vue实例的创建
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
