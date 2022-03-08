import { Module } from 'vuex'

import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

import {
  getGoodsCategorCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from '@/service/main/analysis/dashboard'

export const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.goodsCategoryCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.goodsCategorySale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.goodsCategoryFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.goodsAddressSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getGoodsCategorCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categorySaleResult = await getGoodsCategorySale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      const categoryFavorResult = await getGoodsCategoryFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      const addressGoodsSaleResult = await getGoodsAddressSale()
      commit('changeAddressGoodsSale', addressGoodsSaleResult.data)
    }
  }
}

export default dashboardModule
