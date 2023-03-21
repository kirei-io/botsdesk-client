import axios, { type CreateAxiosDefaults } from 'axios'

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

export const AuthApiInstance = axios.create(authConfig)

export const DefaultApiInstance = axios.create(defaultConfig)
