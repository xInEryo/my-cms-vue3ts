// service 统一出口
import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 携带token
      const token = localCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch(err) {
      return Promise.reject(err)
    },
    responseInterceptor(config) {
      return config
    },
    responseInterceptorCatch(err) {
      return Promise.reject(err)
    }
  }
})
export default myRequest
