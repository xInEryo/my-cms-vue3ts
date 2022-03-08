import myRequest from '@/service'
import { IData } from '@/service/types'

enum DashboardApi {
  goodsCategoryCount = '/goods/category/count',
  goodsCategorySale = '/goods/category/sale',
  goodsCategoryFavor = '/goods/category/favor',
  goodsAddressSale = '/goods/address/sale'
}

export function getGoodsCategorCount() {
  return myRequest.get<IData>({
    url: DashboardApi.goodsCategoryCount
  })
}
export function getGoodsCategorySale() {
  return myRequest.get<IData>({
    url: DashboardApi.goodsCategorySale
  })
}
export function getGoodsCategoryFavor() {
  return myRequest.get<IData>({
    url: DashboardApi.goodsCategoryFavor
  })
}
export function getGoodsAddressSale() {
  return myRequest.get<IData>({
    url: DashboardApi.goodsAddressSale
  })
}
