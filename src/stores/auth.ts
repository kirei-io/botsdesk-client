import { DefaultApiInstance } from '@/api'
import { AuthAPI } from '@/api/auth/AuthAPI'
import { LocalStorageName } from '@/utils/localStorageName'
import { HttpStatusCode } from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const access_token = ref(localStorage.getItem(LocalStorageName.ACCESS_TOKEN))

  const isAuthenticated = computed(
    () => !!localStorage.getItem(LocalStorageName.ACCESS_TOKEN) || !!access_token.value
  )

  function onSignup(email: string, password: string) {
    AuthAPI.createUser({ email, password }).then((res) => {
      if (res.status !== HttpStatusCode.NoContent && res.data) {
        throw new Error(String(res.data.detail))
      }
    })
  }

  function onLogin(username: string, password: string) {
    AuthAPI.userToken({ username, password }).then((res) => {
      if (!('access_token' in res.data)) {
        throw new Error(String(res.data.detail))
      }

      access_token.value = res.data.access_token

      DefaultApiInstance.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${access_token.value}`
        return config
      })

      localStorage.setItem(LocalStorageName.ACCESS_TOKEN, access_token.value)
    })
  }

  function onLogout() {
    access_token.value = null
    localStorage.removeItem(LocalStorageName.ACCESS_TOKEN)
  }

  return {
    access_token,
    isAuthenticated,
    onSignup,
    onLogin,
    onLogout
  }
})
