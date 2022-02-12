import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig, MyRequestInterceptors } from './type'

// loading 组件
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
// import { ILoadingInstance } from 'element-plus/lib/components/loading'

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  loading: any

  constructor(config: MyRequestConfig) {
    // 每次创建的都是新的axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 每个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例都有的拦截
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有请求的拦截')

        this.loading = ElLoading.service({
          lock: true,
          text: '正在请求数据...',
          background: 'rgba(0,0,0,0.5)'
        })

        return config
      },
      (err) => {
        setTimeout(() => {
          this.loading.close()
        }, 1000)
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有响应的拦截')
        setTimeout(() => {
          this.loading.close()
        }, 1000)
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request(config: MyRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}
export default MyRequest
