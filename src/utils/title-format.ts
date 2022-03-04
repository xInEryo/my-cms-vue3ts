// 首字母大写
export function titleCase(pageName: string) {
  return pageName.slice(0, 1).toUpperCase() + pageName.slice(1).toLowerCase()
}
