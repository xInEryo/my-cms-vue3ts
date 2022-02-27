<template>
  <div class="not-found">
    <h2 class="title">Not Found 404</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    onMounted(() => {
      setTimeout(() => {
        router.push('/main')
      }, 3000)
    })
    return {}
  }
})
</script>

<style scoped lang="less">
.not-found {
  .title {
    margin-left: 50px;
  }
}
</style>
