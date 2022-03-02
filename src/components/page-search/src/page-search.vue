<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="$icon['el-icon-refresh']">重置</el-button>
          <el-button type="primary" :icon="$icon['el-icon-search']">
            搜索</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    MyForm
  },
  setup() {
    const formData = ref({
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 40px 15px 0;
}
</style>
