<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          :preview-teleported="true"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '可售' : '售空' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'goods',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick
    }
  }
})
</script>

<style scoped></style>
