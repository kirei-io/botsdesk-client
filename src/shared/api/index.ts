import axios, { type CreateAxiosDefaults } from 'axios'

const authBaseURL = import.meta.env.DEV ? '/auth' : 'https://botsdesk.com/ag'
const defaultBaseURL = import.meta.env.DEV ? '/api' : 'https://botsdesk.com/cu'

const authConfig: CreateAxiosDefaults = {
  baseURL: authBaseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const defaultConfig: CreateAxiosDefaults = {
  baseURL: defaultBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const AuthApiInstance = axios.create(authConfig)
const DefaultApiInstance = axios.create(defaultConfig)

export { AuthApiInstance, DefaultApiInstance }
