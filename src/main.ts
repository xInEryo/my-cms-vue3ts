import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'
// 进行路由注册
import router from './router'
// 进行vuex注册
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

app.use(router)
app.use(store)
setupStore()
app.mount('#app')
