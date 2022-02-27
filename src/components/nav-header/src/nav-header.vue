<template>
  <div class="nav-header">
    <el-icon class="fold-menu">
      <component
        :is="isFold ? $icon['el-icon-fold'] : $icon['el-icon-expand']"
        @click="handleFoldClick"
      ></component>
    </el-icon>

    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './cpns/user-info.vue'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo
  },
  setup(props, { emit }) {
    // 是否折叠
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick
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
