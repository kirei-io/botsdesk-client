export interface CreateUserBodyRequest {
  email: string
  password: string
}

export interface UserTokenBodyRequest {
  username: string
  password: string
  grant_type?: string
  scope?: string
  client_id?: string
  client_secret?: string
}

export interface UserTokenResponse {
  access_token: string
  token_type?: string
}

export interface AuthErrorResponse {
  detail: string | unknown[]
}
