import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MyRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface MyRequestConfig extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors
}
