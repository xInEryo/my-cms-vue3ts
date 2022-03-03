<template>
  <div class="page-content">
    <my-table :listData="userList" v-bind="contentTableConfig">
      <!--1. hander中的插槽 -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 2. 列表中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" type="text" :icon="$icon['el-icon-edit']"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            :icon="$icon['el-icon-delete']"
            style="color: red"
            >删除</el-button
          >
        </div>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import MyTable from '@/base-ui/table'

import { useStore } from '@/store'

export default defineComponent({
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      requied: true
    }
  },
  setup() {
    const store = useStore()
    // 发起网络请求 请求数据
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)
    return {
      userList
    }
  }
})
</script>

<style scoped></style>
