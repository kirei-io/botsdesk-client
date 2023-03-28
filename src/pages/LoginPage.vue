<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/entities/authentication'
import { ROUTE_NAME } from '@/shared/config'
import { LoginForm } from '@/widgets/form-login'
import { useThemeStore } from '@/widgets/theme-button/store'
const store = useAuthStore()
const router = useRouter()
const theme = useThemeStore()

watch(store, () => {
  if (store.isAuthenticated) {
    router.push({ name: ROUTE_NAME.HOME })
  }
})

const submit = (login: string, password: string) => {
  store.onLogin(login, password)
}

const body = ref(document.querySelector('body') as HTMLBodyElement)
body.value.className = theme.theme


</script>

<template>
  <div class="mx-auto w-96 pt-32">
    <LoginForm
      title="Login"
      @form:submit="submit"
    >
    </LoginForm>
  </div>
</template>
