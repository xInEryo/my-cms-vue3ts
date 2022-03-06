<template>
  <div class="my-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"> </slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColum"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        label="序号"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 通过作用域插槽拿到element-plus内置的属性 -->
          <!-- scope.row是拿到每一行的数据 -->
          <template #default="scope">
            <!-- 通过具名插槽和作用域插槽 在父组件可以拿到table中的数据 并对特定一列进行修改 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <div class="el-pagination">
          <el-pagination
            :currentPage="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColum: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(prop, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...prop.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...prop.page, currentPage })
    }

    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.my-table {
  border-top: 20px solid #f0f2f5;
  padding: 20px;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    justify-content: right;
  }
}
</style>
