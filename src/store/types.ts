import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 交叉类型 接口可结合
export type IStore = IRootState & IRootWithModule
