import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { DefaultApiInstance } from '@/shared/api'

import { authentication } from '../api'

export const useAuthStore = defineStore('auth', () => {
  const localStorageAccessToken = localStorage.getItem('access_token')
  const access_token = ref(localStorageAccessToken)

  const error = ref<{
    login?: Error | null
    password?: Error | null
    form?: Error | null
  } | null>(null)

  const isAuthenticated = computed(() => !!access_token.value)

  async function onSignup(email: string, password: string) {
    try {
      if (!email || !password) {
        throw {
          login: !email ? new Error('Email is empty') : null,
          password: !password ? new Error('Password is empty') : null
        }
      }
      await authentication.createUser({ email, password })
    } catch (e: any) {
      if (e.response?.data?.detail) {
        error.value = {
          form: new Error(String(e.response?.data?.detail))
        }
      } else {
        error.value = e
      }
    }
  }

  async function onLogin(username: string, password: string) {
    try {
      access_token.value = null
      if (!username || !password) {
        throw {
          login: !username ? new Error('Login is empty') : null,
          password: !password ? new Error('Password is empty') : null
        }
      }

      const res = await authentication.userToken({ username, password })

      if ('access_token' in res.data) {
        access_token.value = res.data.access_token

        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', res.data.access_token)

        DefaultApiInstance.interceptors.request.use((config) => {
          config.headers['Authorization'] = `Bearer ${access_token.value}`
          return config
        })
      }
    } catch (e: any) {
      if (e.response?.data?.detail) {
        error.value = {
          form: new Error(String(e.response?.data?.detail))
        }
      } else {
        error.value = e
      }
    }
  }

  function onResetError() {
    error.value = null
  }

  function onLogout() {
    $reset()
    localStorage.removeItem('access_token')
  }

  function $reset() {
    access_token.value = null
    error.value = null
  }

  return {
    access_token,
    error,
    isAuthenticated,
    onSignup,
    onLogin,
    onLogout,
    onResetError
  }
})
