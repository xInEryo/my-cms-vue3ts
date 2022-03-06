import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 交叉类型 接口可结合
export type IStore = IRootState & IRootWithModule
