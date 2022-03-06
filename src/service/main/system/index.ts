import myRequest from '@/service'
import { IData } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IData>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return myRequest.delete<IData>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return myRequest.post<IData>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return myRequest.patch<IData>({
    url: url,
    data: editData
  })
}
