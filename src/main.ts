import { createApp } from 'vue'
import App from './App.vue'
// import { registerApp } from './global'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// import './service/axios_demo'
import myRequest from './service'
// 进行路由注册
import router from './router'
// 进行vuex注册
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

myRequest.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor(config) {
      console.log('单个请求成功的拦截')
      return config
    },
    responseInterceptor(res) {
      console.log('单个响应成功的拦截')
      return res
    }
  }
})
