<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/entities/authentication'
import { ROUTE_NAME } from '@/shared/config'
import { RouteLinkInline } from '@/shared/ui'
import { LoginForm } from '@/widgets/form-login'
const store = useAuthStore()
const router = useRouter()
watch(store, () => {
  if (store.isAuthenticated) {
    router.push({ name: ROUTE_NAME.HOME })
  }
})

const submit = (login: string, password: string) => {
  store.onLogin(login, password)
}
</script>

<template>
  <div class="mx-auto w-96 pt-32">
    <LoginForm title="Login" @form:submit="submit">
      <RouteLinkInline :to="{ name: ROUTE_NAME.SIGNUP }"> Don't have an account? </RouteLinkInline>
    </LoginForm>
  </div>
</template>
