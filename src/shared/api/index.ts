import axios, { type CreateAxiosDefaults } from 'axios'

// const authBaseURL = import.meta.env.DEV ? '/auth' : 'https://botsdesk.com/cu'
// const defaultBaseURL = import.meta.env.DEV ? '/api' : 'https://botsdesk.com/ag'

const authConfig: CreateAxiosDefaults = {
  baseURL: 'https://botsdesk.com/cu',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const defaultConfig: CreateAxiosDefaults = {
  baseURL: 'https://botsdesk.com/ag',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const pushConfig: CreateAxiosDefaults = {
  baseURL: 'https://botsdesk.com/ph',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('business_access_token')}`
  }
}

const AuthApiInstance = axios.create(authConfig)
const DefaultApiInstance = axios.create(defaultConfig)
const PushApiInstance = axios.create(pushConfig)

export { AuthApiInstance, DefaultApiInstance, PushApiInstance }
