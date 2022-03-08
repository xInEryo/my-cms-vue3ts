<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <my-card title="商品类别数量(饼图)">
          <pie-echart :pieData="goodsCategoryCount"></pie-echart>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card title="商品类别数量(玫瑰图)">
          <rose-echart :roseData="goodsCategoryCount"></rose-echart>
        </my-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <my-card title="不同商品类别的销量">
          <line-echart v-bind="goodsCategorySale"></line-echart>
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card title="不同商品类别的收藏">
          <bar-echart v-bind="goodsCategoryFavor"></bar-echart>
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

import MyCard from '@/base-ui/card'

export default defineComponent({
  name: 'dashboard',
  components: {
    MyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const goodsCategoryCount = computed(() => {
      return store.state.dashboard.goodsCategoryCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const goodsCategorySale = computed(() => {
      const xLabels: string[] = []
      const value: any[] = []

      const goodsCategorySale = store.state.dashboard.goodsCategorySale
      for (const item of goodsCategorySale) {
        xLabels.push(item.name)
        value.push(item.goodsCount)
      }

      return {
        xLabels,
        value
      }
    })

    const goodsCategoryFavor = computed(() => {
      const xLabels: string[] = []
      const value: any[] = []
      const goodsCategoryFavor = store.state.dashboard.goodsCategoryFavor
      for (const item of goodsCategoryFavor) {
        xLabels.push(item.name)
        value.push(item.goodsFavor)
      }

      return {
        xLabels,
        value
      }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.goodsAddressSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      goodsCategoryCount,
      goodsCategorySale,
      goodsCategoryFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
