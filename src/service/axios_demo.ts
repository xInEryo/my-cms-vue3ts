import axios from 'axios'

// interface IData {
//   name: string
//   sex: string
// }

// axios的实例对象

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res)
// })

axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'monster',
      age: 23
    }
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('http://httpbin.org/post', {
    name: 'hujun',
    sex: '男'
  })
  .then((res) => {
    console.log(res.data)
  })

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return err
  }
)

axios.interceptors.response.use(
  (res) => {
    res.data.name = 'zhangsan'
    console.log('成功!!!')
    return res
  },
  (err) => {
    return err
  }
)
