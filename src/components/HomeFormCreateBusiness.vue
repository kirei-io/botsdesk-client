<script setup lang="ts">
import type { LanguageConfiguration } from '@/types/LanguageConfiguration'
import { computed } from 'vue'

interface CreateBusinessProps {
  formId: string
  businessName: string
  language_configuration: LanguageConfiguration
}
type CreateBusinessEmit = {
  (event: 'update:businessName', value: string): void
  (event: 'update:language_configuration', value: string): void
}

const props = defineProps<CreateBusinessProps>()

const emit = defineEmits<CreateBusinessEmit>()

const languageSelect: Record<LanguageConfiguration, string> = {
  english: 'English'
}

const businessName = computed({
  get() {
    return props.businessName
  },
  set(value: string) {
    emit('update:businessName', value)
  }
})

const language_configuration = computed({
  get() {
    return props.language_configuration
  },
  set(value: LanguageConfiguration) {
    emit('update:language_configuration', value)
  }
})
</script>
<template>
  <form :id="props.formId" class="flex flex-col gap-4">
    <input
      v-model="businessName"
      type="text"
      placeholder="Business Name"
      class="rounded p-2 shadow-sm"
    />
    <select v-model="language_configuration" class="rounded p-2 shadow-sm">
      <option value="" disabled>Choose Language</option>
      <option v-for="(name, key) in languageSelect" :key="key" :value="key">{{ name }}</option>
    </select>
  </form>
</template>
