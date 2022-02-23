import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

// 交叉类型 接口可结合
export type IStore = IRootState & IRootWithModule
