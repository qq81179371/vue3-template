// http/index.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
// 创建axios的一个实例
const request = axios.create({
  baseURL: 'http://192.168.1.155:8701',
  timeout: 5000, // 设置超时
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = getToken('token')
    config.headers.Authorization = token || 0
    config.headers.UserId = '10000'
    if (config.method === 'POST') {
      config.data = JSON.stringify(config.data)
    }
    return config
  },
  error => Promise.reject(error)
)

request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status) {
      ElMessage.error(error.response.msg)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request
