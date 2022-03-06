import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  // 权限格式 system:users:delete
  const verifyPermission = `system:${pageName}:${handleName}`
  return permissions.some((item) => item === verifyPermission)
}
