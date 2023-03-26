<script setup lang="ts">
import { ref } from 'vue';

import { useAuthStore } from '@/entities/authentication';
import { ButtonRaised, CardLayout, FormLayout, InputText } from '@/shared/ui';

interface LoginFormProps {
  title: string
}

const props = defineProps<LoginFormProps>()

const store = useAuthStore()


const login = ref<string>('')
const password = ref<string>('')

const emit = defineEmits<{
  (e: 'form:submit', login: string, passwor: string): void
}>()



const submit = () => {
  emit('form:submit', login.value, password.value)
}

const resetError = () => {
  store.onResetError()
}
</script>

<template>
  <CardLayout class="!p-8">
    <h1 class="px-4 mb-10 text-3xl font-semibold text-ctp-subtext0">{{ props.title
    }}</h1>
    <FormLayout
      @submit.prevent="submit"
      @keydown="resetError"
      id="form-login"
      class="flex"
    >
      <InputText
        v-model:value="login"
        name="login"
        label="Login"
        placeholder="Enter your login"
        :validation-mesage="String(store.error?.login?.message)"
        :is-valid="!!store.error?.login"
      />
      <InputText
        v-model:value="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        :validation-mesage="String(store.error?.password?.message ?? store.error?.form?.message)"
        :is-valid="!!store.error?.password || !!store.error?.form"
      />
      <ButtonRaised class="mt-10">
        {{ props.title }}
      </ButtonRaised>
    </FormLayout>
    <div class="text-center mt-4 text-sm">
      <slot />
    </div>
  </CardLayout>
</template>
