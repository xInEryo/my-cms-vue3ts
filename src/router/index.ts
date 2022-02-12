import { createRouter, createWebHashHistory } from 'vue-router'

// type 表示导入的是一个类型
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // ()=>import("path") 表示懒加载
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    // ()=>import("path") 表示懒加载
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
