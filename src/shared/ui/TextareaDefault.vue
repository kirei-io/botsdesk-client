<script setup lang="ts">
import { computed } from 'vue';

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
      class="resize-none w-full px-4 py-2 bg-ctp-crust rounded-md focus:bg-ctp-surface0 placeholder:text-ctp-overlay1 transition-colors duration-300 ease-in-out drop-shadow outline-none"
    ></textarea>
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
