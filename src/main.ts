import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'
// 进行路由注册
import router from './router'
// 进行vuex注册
import store from './store'
import { setupStore } from './store'

// 注册全局图标
import registerIcon from './global/register-element-icon'

const app = createApp(App)

app.use(registerIcon)

app.use(store)
setupStore()

app.use(router)
app.mount('#app')
