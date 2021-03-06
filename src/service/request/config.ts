// 关于 service的配置文件

/**
 * 根据process.env.NODE_ENV区分
 * 1. 开发环境：development
 * 2. 生产环境：production
 * 3. 测试环境：test
 */

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000/prod'
} else {
  BASE_URL = 'http://152.136.185.210:5000/test'
}

export { BASE_URL, TIME_OUT }
