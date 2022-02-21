<template>
  <div class="login-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    const loginAction = () => {
      console.log('phoneLoginAction')
    }

    return {
      phone,
      loginAction
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-code > .btn {
  margin-left: 5px;
}
</style>
