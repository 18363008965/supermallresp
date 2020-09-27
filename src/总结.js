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
* */
