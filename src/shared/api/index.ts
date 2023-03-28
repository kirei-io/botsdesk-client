// const customer = new CustomerApi(DefaultApiInstance)
import axios, { type CreateAxiosDefaults } from 'axios'

// import { CustomerApi } from './customer'

const authConfig: CreateAxiosDefaults = {
  baseURL: '/auth',
  // baseURL: 'https://botsdesk.com/ag',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const defaultConfig: CreateAxiosDefaults = {
  baseURL: '/api',
  // baseURL: 'https://botsdesk.com/cu',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const AuthApiInstance = axios.create(authConfig)
const DefaultApiInstance = axios.create(defaultConfig)

// const customer = new CustomerApi(DefaultApiInstance)
export { AuthApiInstance, DefaultApiInstance }
