// 做一些缓存的工作
class LocalCache {
  // 设置缓存
  setCache(key: string, value: any) {
    // obj => string
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 获取缓存
  getCache(key: string) {
    // string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  // 删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
