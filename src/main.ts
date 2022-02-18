import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'
// import './service/axios_demo'
// import myRequest from './service'
// 进行路由注册
import router from './router'
// 进行vuex注册
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// myRequest
//   .get<DataType>({
//     url: '/home/multidata'
//     // method: 'GET'
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
