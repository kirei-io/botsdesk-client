import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AuthApiInstance } from '@/shared/api'
import { toFormURLEncoded } from '@/shared/lib'

import type { CreateUserBodyRequest, UserTokenBodyRequest, UserTokenResponse } from './interface'

class AuthApi {
  private readonly path = {
    createUser: () => '/user/',
    userToken: () => '/user/token'
  }

  constructor(private readonly request: AxiosInstance) {}

  public createUser(data: CreateUserBodyRequest): Promise<AxiosResponse<null>> {
    const url = this.path.createUser()
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return this.request.post(url, data, config)
  }

  public userToken(data: UserTokenBodyRequest): Promise<AxiosResponse<UserTokenResponse>> {
    const url = this.path.userToken()
    const encodedData = toFormURLEncoded(data)

    return this.request.post(url, encodedData)
  }
}

export const authentication = new AuthApi(AuthApiInstance)
