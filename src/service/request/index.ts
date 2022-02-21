import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig, MyRequestInterceptors } from './type'

// loading 组件
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
// import { ILoadingInstance } from 'element-plus/lib/components/loading'

// 默认情况 isloding为true
const DEFAULT_LOADING = true

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading: boolean
  loading: any

  constructor(config: MyRequestConfig) {
    // 每次创建的都是新的axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应每个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 所有实例都有的拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        // 关闭加载遮罩层
        this.loading.close()
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 关闭加载遮罩层
        this.loading.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求错误')
        } else {
          return data
        }
      },
      (err) => {
        return err
      }
    )
  }

  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading设置为true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果通过resolve返回
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING

          reject(err)
          return err
        })
    })
  }

  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default MyRequest
