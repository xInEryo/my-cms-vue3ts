<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>

    <page-model
      :modelConfig="modelConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      ref="pageModelRef"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handleCheckChange"
        />
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModel from '@/components/page-model'

import { usePageModel } from '@/hooks/usePageModel'

import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leftKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leftKeys, false)
      })
    }

    // 调用hook获取公共变量和函数
    const [defaultInfo, pageModelRef, handleEditData, handleNewData] =
      usePageModel(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => {
      return store.state.entireMenu
    })

    // 将role树中选中的选项的id传给otherInfo
    // menuList中的菜单信息就是新建角色时的权限
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modelConfig,
      defaultInfo,
      pageModelRef,
      handleEditData,
      handleNewData,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 60px;
}
</style>
