<script setup lang="ts">
import { computed } from 'vue';

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
      class="inline-block text-xs text-ctp-subtext0 px-4 mb-2 font-semibold"
    >
      {{ props.label }}</label>
    <input
      v-model="value"
      :type="props.type ?? 'text'"
      :id="props.name"
      :name="props.name"
      :placeholder="props.placeholder"
      class="w-full px-4 py-2 bg-ctp-crust rounded-md focus:bg-ctp-surface0 outline-none placeholder:text-ctp-overlay1 transition-colors duration-300 ease-in-out drop-shadow"
    >
    <div
      v-if="props.validationMesage"
      class="h-4 text-xs text-ctp-maroon px-4 my-2 font-semibold"
    >
      <span v-show="props.isValid">
        {{ props.validationMesage }}
      </span>
    </div>
  </div>
</template>
