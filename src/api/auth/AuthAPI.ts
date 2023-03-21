import { toFormUrlEncoded } from '@/utils/toFormUrlEncoded'
import type { AxiosResponse } from 'axios'
import { AuthApiInstance } from '..'
import type {
  AuthErrorResponse,
  CreateUserBodyRequest,
  UserTokenBodyRequest,
  UserTokenResponse
} from './AuthAPI.interface'

export class AuthAPI {
  private static PATH = {
    createUser: '/user',
    userToken: '/user/token'
  } as const

  public static createUser(
    data: CreateUserBodyRequest
  ): Promise<AxiosResponse<null | AuthErrorResponse>> {
    return AuthApiInstance.post(AuthAPI.PATH.createUser, data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public static userToken(
    data: UserTokenBodyRequest
  ): Promise<AxiosResponse<UserTokenResponse | AuthErrorResponse>> {
    return AuthApiInstance.post(AuthAPI.PATH.userToken, toFormUrlEncoded(data))
  }
}
