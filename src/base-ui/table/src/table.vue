<template>
  <div class="my-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 通过作用域插槽拿到element-plus内置的属性 -->
          <!-- scope.row是拿到el-table中data的数据 -->
          <template #default="scope">
            <!-- 通过具名插槽和作用域插槽 在父组件可以拿到table中的数据 并对特定一列进行修改 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.my-table {
  border-top: 20px solid #f0f2f5;
  padding: 20px;
}
</style>
