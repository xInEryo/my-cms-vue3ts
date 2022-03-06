<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="$icon['el-icon-refresh']" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            :icon="$icon['el-icon-search']"
            @click="handleQueryClick"
          >
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
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(prop, { emit }) {
    // 双向绑定的属性应该是由配置文件的field决定
    const formItems = prop.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      // for (const key in formData.value) {
      //   formData.value[key] = ''
      // }

      formData.value = formOriginData
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 60px 20px 0;
}
</style>
