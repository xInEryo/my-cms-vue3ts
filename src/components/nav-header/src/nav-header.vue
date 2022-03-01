<template>
  <div class="nav-header">
    <el-icon class="fold-menu">
      <component
        :is="isFold ? $icon['el-icon-fold'] : $icon['el-icon-expand']"
        @click="handleFoldClick"
      ></component>
    </el-icon>

    <div class="content">
      <my-bread-crumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './cpns/user-info.vue'
import MyBreadCrumb from '@/base-ui/breadcrumb'
import { pathMapBreadCrumb } from '@/utils/map-menus'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    MyBreadCrumb
  },
  setup(props, { emit }) {
    // 是否折叠
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑data：[{name:string,path?:string}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadCrumb(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-content: center;
  width: 100%;

  .fold-menu {
    font-size: 25px;
    cursor: pointer;
    margin: auto 0;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
