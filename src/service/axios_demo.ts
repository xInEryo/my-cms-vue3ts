// import axios from 'axios'

import myRequest from '@/service/index'

// interface IData {
//   name: string
//   sex: string
// }

// axios的实例对象

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res)
// })

// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'monster',
//       age: 23
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
// axios.interceptors.response.use(
//   (res) => {
//     // res.data.name = 'zhangsan'
//     console.log('成功!!!')
//     return res
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

// axios
//   .post('http://152.136.185.210:5000/login', {
//     name: 'coderwhy',
//     password: '123456'
//   })
//   .then(
//     (res) => {
//       console.log(res.data)
//     },
//     (err) => {
//       console.log(err, 123)
//     }
//   )

// axios.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (err) => {
//     return err
//   }
// )

myRequest
  .post({
    url: 'http://152.136.185.210:500',
    data: {
      name: 'coderwhy',
      password: '1234'
    },
    interceptors: {
      requestInterceptor(config) {
        console.log(config)
        return config
      },
      requestInterceptorCatch(err) {
        return Promise.reject(err)
      },
      responseInterceptor(res) {
        console.log(res)
      },
      responseInterceptorCatch(err) {
        console.log(err, 3)
        return Promise.reject(err)
      }
    },
    showLoading: false
  })
  .then((err) => {
    console.log(err)
  })
