/*
* 对axios的封装，这样在别处使用axios发送网络请求时直接引入该文件即可。
* */
import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL: 'xxxxx',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
