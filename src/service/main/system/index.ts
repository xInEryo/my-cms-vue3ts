import myRequest from '@/service'
import { IData } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IData>({
    url: url,
    data: queryInfo
  })
}
