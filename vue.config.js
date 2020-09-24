/*
* 为项目中的一些常用的路径添加别名，在引用时直接使用别名即可，不需要在使用../../等方式
* */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
