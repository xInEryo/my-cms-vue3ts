import { createRouter, createWebHashHistory } from 'vue-router'

// type 表示导入的是一个类型
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    // ()=>import("path") 表示懒加载
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    // ()=>import("path") 表示懒加载
    component: () => import('@/views/main/main.vue')
    // children:[] -> 根据userMenus来决定
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

// 配置路由
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 路由守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token')

  if (to.path !== '/login') {
    // 如果本地没有token，则跳转到登录页面（说明未登录）
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
