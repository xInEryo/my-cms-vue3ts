<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>

    <page-model
      :modelConfig="modelConfigRef"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },

  setup() {
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()

    // pageModel的回调函数
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )

      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )

      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }

    // 动态添加部门和角色列表
    const store = useStore()
    // 通过computed 获取异步请求的数据
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })

    // 调用hook获取公共变量和函数
    const [defaultInfo, pageModelRef, handleEditData, handleNewData] =
      usePageModel(newCallback, editCallback)
    return {
      modelConfigRef,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick,
      handleNewData,
      handleEditData,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
