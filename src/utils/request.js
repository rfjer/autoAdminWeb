import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'JWT ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.errmsg) {
    Message.error(res.errmsg)
    return Promise.reject(response)
  }
  return res
}, error => {
  if (!error.response) {
    Message.error('系统错误')
    return Promise.reject(error)
  }
  if (error.response.status === 401) {
    store.dispatch('FedLogOut').then(() => {
      router.push({ path: '/login' })
    })
  } else if (error.response.status === 403) {
    Message({
      message: '权限拒绝',
      type: 'error',
      duration: 1500,
      onClose: function() {
        router.push({ path: '/dashboard' })
      }
    })
  } else if (error.response.status === 400) {
    console.log(111)
    Message({
      type: 'error',
      message: '认证失效，请重新登陆'
    })
  } else if (error.response.status === 500) {
    Message({
      type: 'error',
      message: '服务器内部错误'
    })
  } else {
    Message({
      type: 'error',
      message: error.response.data.detail
    })
  }
  return Promise.reject(error)
}
)

export default service
