import { createStore } from 'vuex'
import login from './login/login'
import { IRootState } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'monster',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

// 初始化vuex 将本地缓存内的数据放到vuex中
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
