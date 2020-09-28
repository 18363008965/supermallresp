/*
* 防抖函数的封装
* func：参入要防抖的函数
* delay：防抖的延迟时间
* */
export function debounce(func, delay) {
  let timer = null;
  //此处返回一个函数，可以传入多个参数
  return function (...args) {
    //如果上次的时间存在，那么就清除
    if(timer) clearTimeout(timer);
    //重新设置延迟时间
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}
