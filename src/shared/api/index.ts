// const customer = new CustomerApi(DefaultApiInstance)
import { processExpression } from '@vue/compiler-core'
import axios, { type CreateAxiosDefaults } from 'axios'

// import { CustomerApi } from './customer'

const authConfig: CreateAxiosDefaults = {
  baseURL: '/auth',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
const defaultConfig: CreateAxiosDefaults = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const AuthApiInstance = axios.create(authConfig)
const DefaultApiInstance = axios.create(defaultConfig)

// const customer = new CustomerApi(DefaultApiInstance)
export { AuthApiInstance, DefaultApiInstance }
