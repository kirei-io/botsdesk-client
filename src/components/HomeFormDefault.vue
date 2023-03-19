<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  formId: string
  question: string
  answer: string
}>()

const emit = defineEmits<{
  (event: 'update:question', value: string): void
  (event: 'update:answer', value: string): void
}>()

const answer = computed({
  get() {
    return props.answer
  },
  set(value: string) {
    emit('update:answer', value)
  }
})

const question = computed({
  get() {
    return props.question
  },
  set(value: string) {
    emit('update:question', value)
  }
})
</script>
<template>
  <form :id="props.formId" class="flex flex-col gap-4">
    <input
      v-model="question"
      class="rounded border border-transparent bg-ctp-mantle px-6 py-4 shadow-sm placeholder:text-ctp-overlay1 focus:border-ctp-surface1 focus:bg-ctp-base focus:outline-none"
      type="text"
      id="question"
      placeholder="Question"
    />
    <textarea
      v-model="answer"
      class="resize-none rounded border border-transparent bg-ctp-mantle px-6 py-4 shadow-sm placeholder:text-ctp-overlay1 focus:border-ctp-surface1 focus:bg-ctp-base focus:outline-none"
      name="answer"
      id="answer"
      cols="30"
      rows="10"
      placeholder="Answer"
    ></textarea>
  </form>
</template>
