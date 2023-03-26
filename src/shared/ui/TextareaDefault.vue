<script setup lang="ts">
import { computed } from 'vue'

interface TextAreaProps {
  name: string
  value: string
  placeholder?: string
  validationMesage?: string
  isValid?: boolean
}

const props = defineProps<TextAreaProps>()
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
    <textarea
      v-model="value"
      rows="15"
      :id="props.name"
      :name="props.name"
      :placeholder="props.placeholder"
      :aria-label="`Textarea ${props.name}`"
      class="w-full resize-none rounded-md bg-ctp-crust px-4 py-2 outline-none drop-shadow transition-colors duration-300 ease-in-out placeholder:text-ctp-overlay1 focus:bg-ctp-surface0"
    ></textarea>
    <div v-if="props.validationMesage" class="my-2 h-4 px-4 text-sm font-semibold text-ctp-maroon">
      <span v-show="props.isValid">
        {{ props.validationMesage }}
      </span>
    </div>
  </div>
</template>
