/*
*
* 1.如果想要获取组件内的元素，那么只能在组件的mounted方法中来获取，而不能在created方法来获取，
*     在created中获取的都是undefined！
*
* 2.<style scoped></style> 中scoped属性的作用
*   scoped：该属性的作用是指当前页面中的css的样式属性只在本页面中期效果，在其余的页面中同名的class属性不起效果。
    如果不加的话，那么对所有的同名的class属性都会起效果。
*
* 3.ref的作用
*   ref属性除了可以用于在组件上以外，还可以用在div这种普通的dom元素中，都是用来获取对应的元素的对象
*   用在组件上，this.$refs.xxx：表示获取对应组件的对象
*   用在div普通dom元素上，thi.$refs.xxx：表示获取对应的普通dom元素的对象
*
* 4.native属性的解释
*   什么时候使用native属性？
*   当我们想监听组件的原生事件时需要使用native属性，比如我们想监听组件的click点击事件，那么需要使用native修饰符
*   例子：@click.native="xxxx事件名称"
*
* 5.事件总线知识点
*   在我们项目开发中，如果要在非父子组件进行通信时，我们可以使用事件总线来实现，具体的实现方式如下：
*   ①.需要在main.js入口函数中给事件总线$bus创建实例即：Vue.prototype.$bus = new Vue();
*   ②.使用 this.$bus.$emit('xxxxx') 来发射事件
*   ③.使用this.$bus.$on('xxxxx') 来监听我们发射过来的时间，之后传一个无参的箭头函数，在函数中进行相应的操作
*
*   此处是监听的商品列表中的图片元素，因此需要在GoodListsItem组件发射事件，同时需要在Home首页组件中监听发过来的事件。
*
* 6.vuex中的知识点总结
*   vuex中的mapGetters函数是vuex中的getters辅助函数，用于将getters中的属性映射到相应的组件中
*
*
* 7.vuex中的知识点总结
*   （1）.mapGetters的使用：mapGetters的作用是将vuex中的getters中的属性和方法映射到对应的所使用的组件中
*       首先需要先从vuex中导入mapGetters，之后在computed计算属性中进行使用
*       import {mapGetters} from ‘vuex’;
*       computed: {
*         ...mapGetters([
*           'xxx属性',
*           'xxx方法'
*         ])
*       }
*
*       还可以使用对象的使用方式即：
*       ...mapGetters({
*         add: 'xxx属性或者方法'
*       })
*   （2）.mapActions的使用：mapActions的作用是将vuex中的actions的方法映射到对应的所使用的组件中
*       首先需要先从vuex中导入mapActions，之后在methods中使用
*       import mapActions from 'vuex';
*       methods: {
*         ...mapActions([
*           'xxx方法'
*         ])
*       }
*
*     还可以使用对象的使用方式即：
*     ...mapActions({
*       xxx: 'xxx方法'
*     })
*
*   （3）vuex中的actions中返回Promise方法
*       在vuex中的actions还可以返回Promise，之后在对应的组件中直接使用then函数获取对应的数据
*       即：
*       return new Promise((resolve, reject) => {
*         //业务操作.....
*         resolve('xxxxx数据');
*       })
*
*       在组件中使用
*       xxx.then(res => {
*         //业务操作.....
*       })
*
*
*  8.FastClick插件的使用
*    作用：fastclick插件的作用是：解决移动端的点击时延迟300毫秒的问题，使其点击切换不在有延迟
*    ①安装插件
*     npm install fastclick --save
*
*    ②在main.js文件中导入插件
*     import FastCLick from ‘fastclick’
*
*    ③调用attach方法进行使用
*     FastClick.attach(document.body);
*
*
* 9.vue-lazyload插件的使用
*   作用：vue-lazyload的作用是图片懒加载，即：当使用图片时在进行加载显示
*   ①安装插件
*     npm install vue-lazyload --save
*
*   ②在main.js中导入插件
*     import LazyLoad from 'vue-lazyload'
*
*   ③注册插件
*     Vue.use(LazyLoad)
*
*   ④在对应的组件中使用v-lazy进行懒加载对应的图片，此处以在GoodsListItem组件中使用为例
*     <img v-lazy="showImage" alt="" @load="imgLoad">
*
*
* */
