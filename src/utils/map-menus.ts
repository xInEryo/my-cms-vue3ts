import { IBreadCrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

// 通过路径找到 currentMenu ，也就是正在点击的菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const currentMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (currentMenu) {
        breadcrumbs?.push({ name: menu.name, path: '' })
        breadcrumbs?.push({ name: currentMenu.name, path: '' })
        return currentMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
  return ''
}

// 通过调用pathMapToMenu把currentMenu的name,url以及上层的Menu的name,url放入数组
export function pathMapBreadCrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadCrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 菜单按钮权限映射
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const __resourceGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        __resourceGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  __resourceGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
