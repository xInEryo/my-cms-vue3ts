<template>
  <div class="top10-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'

import { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType
}>()

const options = computed(() => {
  return {
    // legend: {
    //   top: 'bottom'
    // },
    tooltip: {},
    series: [
      {
        // name: '类别数据',
        type: 'pie',
        radius: [10, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
