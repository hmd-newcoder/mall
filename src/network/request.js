import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })
  // 2.axios拦截
  // 2.1 拦截请求
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config;
  // }, err => {
  //   console.log(err);
  // })
  // 2.2 拦截响应
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    return err
  })
  return instance(config)


}
