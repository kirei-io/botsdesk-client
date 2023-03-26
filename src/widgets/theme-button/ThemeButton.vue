<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'

import { ButtonFlat } from '@/shared/ui'

import { useThemeStore } from './store'

const store = useThemeStore()

const switchTheme = () => {
  store.onSwtich()
  body.value.className = store.theme
}

const body = ref(document.querySelector('body') as HTMLBodyElement)
body.value.className = store.theme

const icon = computed(() => {
  return store.theme === 'ctp-latte' ? 'moon' : 'sun'
})
</script>

<template>
  <ButtonFlat class="!px-2 hover:!bg-ctp-mantle" @click="switchTheme">
    <FontAwesomeIcon :icon="['fas', icon]" />
  </ButtonFlat>
</template>
