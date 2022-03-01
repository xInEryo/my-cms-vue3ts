// 编写规则
export const rules = {
  name: [
    {
      required: true,
      message: '必须输入账号',
      // 失去焦点的时候验证
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,8}$/,
      message: '用户名必须是3~8个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '必须输入密码',
      // 失去焦点的时候验证
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
