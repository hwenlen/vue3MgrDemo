import axios from "axios";
import {Message} from "view-ui-plus";
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'


// 处理  类型“AxiosResponse<any, any>”上不存在属性“result”。ts(2339)。
declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number,
    message: string,
    result: T
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}


const params = {
  version: '1.0.0'
}

const request = axios.create({
  baseURL: '/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  //支持跨域传递cookie
  config.withCredentials = true;
  // 在发送请求之前做些什么
  config.data = Object.assign({}, params, config.data)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let { data } = response
      
  if (data.code === undefined) {
    return response
  }
  if (data.code === 0) {
    return data
  } else {
    if (data.code > 0) {
      // 后端服务在个别情况下回报201，待确认
      if (data.code === 401) {
        Cookies.remove(TOKEN_KEY)
        window.location.href = '/login'
        Message.error('未登录，或登录失效，请登录')
      } else {
        if (data.msg) Message.error(data.msg)
      }
      return data
    }
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request