import myRequest from '../index'
import { IData } from '../types'
import { IAccount, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法：/users/id
  UserMenus = '/role/' // 用法：/role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IData<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IData>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return myRequest.get<IData>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
