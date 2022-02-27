import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context() 是webpack中的一个工具函数，
  // 能够加载某个文件夹找到对应结尾（正则）的文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // routerFiles.keys()返回一个string[] 数组中的值就是文件的path(相对于所查找的文件夹)
  routeFiles.keys().forEach((key) => {
    // 通过require去加载对应的文件
    const route = require('../router/main' + key.split('.')[1])
    // route.default 是一个对象包含路由信息
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // 当type === 2的时候才需要建立相应的映射

  // 递归查找获取匹配到的路由
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => menu.url === route.path)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
