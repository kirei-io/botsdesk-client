import type { AxiosInstance, AxiosResponse } from 'axios'

import { PushApiInstance } from '@/shared/api'

import type { SendSubscriptionsInput } from './interface'

export class PushApi {
  private readonly path = {
    send: () => '/subscription/send'
  }

  constructor(private readonly request: AxiosInstance) {
    this.request.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('business_access_token')
          window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }

  public send(data: SendSubscriptionsInput): Promise<AxiosResponse<null>> {
    const url = this.path.send()

    return this.request.post(url, data)
  }
}

export const push = new PushApi(PushApiInstance)
