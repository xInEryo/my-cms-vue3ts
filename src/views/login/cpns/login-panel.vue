<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="icon">
            <el-icon>
              <component
                :is="$icon['el-icon-user-filled']"
              ></component> </el-icon
            >账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="icon">
            <el-icon>
              <component :is="$icon['el-icon-iphone']"> </component> </el-icon
            >手机登录
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 属性
    const isKeepPassword = ref(true)
    // 在ts中 ref接受一个泛型 这个泛型可以明确value的类型
    // ref<T>(value: T)
    // ref中的值放在value中
    // InstanceType<typeof LoginAccount> 可以拿到组件实例的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const currentTab = ref<string>('account')

    // 方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.account-control {
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
  margin-top: 8px;
}
</style>
