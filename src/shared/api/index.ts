import axios, { type CreateAxiosDefaults } from 'axios'

const authBaseURL = import.meta.env.DEV ? '/auth' : 'https://botsdesk.com/cu'
const defaultBaseURL = import.meta.env.DEV ? '/api' : 'https://botsdesk.com/ag'
const pushBaseURL = import.meta.env.DEV ? '/push' : 'https://botsdesk.com/ph'

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

const pushConfig: CreateAxiosDefaults = {
  baseURL: pushBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('business_access_token')}`
  }
}

const AuthApiInstance = axios.create(authConfig)
const DefaultApiInstance = axios.create(defaultConfig)
const PushApiInstance = axios.create(pushConfig)

export { AuthApiInstance, DefaultApiInstance, PushApiInstance }
