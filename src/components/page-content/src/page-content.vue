<template>
  <div class="page-content">
    <my-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!--1. hander中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          新建用户
        </el-button>
      </template>
      <!-- 2. 列表中的插槽 -->

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="small"
            type="text"
            :icon="$icon['el-icon-edit']"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="small"
            type="text"
            :icon="$icon['el-icon-delete']"
            style="color: red"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import MyTable from '@/base-ui/table'

import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      requied: true
    },
    pageName: {
      type: String,
      requied: true,
      default: ''
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0. 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1. 双向绑定pageInfo
    let isSearch = false
    const pageDefaultInfo = {
      currentPage: 1,
      pageSize: 10
    }

    const pageInfo = ref(pageDefaultInfo)

    watch(pageInfo, () => {
      if (!isSearch) {
        getPageData()
      }
    })

    // 2. 发起网络请求 请求数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      // 判断是否处于search状态
      isSearch = Object.values(queryInfo).some((item: any) => item !== '')
        ? true
        : false
      if (isSearch) {
        pageInfo.value = pageDefaultInfo
      }
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3. 从vuex中获取数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 4. 获取其它动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5. 删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
