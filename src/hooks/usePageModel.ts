import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallbackFn = () => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const defaultInfo = ref({})
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewData = () => {
    // 新建时将数据清空
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb()
  }

  return [defaultInfo, pageModelRef, handleEditData, handleNewData]
}
