<script setup lang="ts">
import { computed } from 'vue'

interface InputTextProps {
  value: string
  name: string
  label?: string
  type?: string
  placeholder?: string
  validationMesage?: string
  isValid?: boolean
}

const props = defineProps<InputTextProps>()
const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()

const value = computed({
  get() {
    return props.value
  },
  set(value: string) {
    emit('update:value', value)
  }
})
</script>

<template>
  <div>
    <label
      v-if="props.label"
      :for="props.label"
      class="mb-2 inline-block px-4 text-sm font-semibold text-ctp-subtext0"
    >
      {{ props.label }}</label
    >
    <input
      v-model="value"
      :type="props.type ?? 'text'"
      :id="props.name"
      :name="props.name"
      :placeholder="props.placeholder"
      class="w-full rounded-md bg-ctp-crust px-4 py-2 outline-none drop-shadow transition-colors duration-300 ease-in-out placeholder:text-ctp-overlay1 focus:bg-ctp-surface0"
    />
    <div v-if="props.validationMesage" class="my-2 h-4 px-4 text-sm font-semibold text-ctp-maroon">
      <span v-show="props.isValid">
        {{ props.validationMesage }}
      </span>
    </div>
  </div>
</template>
