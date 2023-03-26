<script setup lang="ts">
import { useArticleStore } from '@/entities/customer'
import { FormLayout, InputText, TextareaDefault } from '@/shared/ui'

const props = defineProps<{ formName: string }>()

const store = useArticleStore()

const keydown = () => {
  if (store.error) {
    store.onErrorReset()
  }
}
</script>

<template>
  <div>
    <div class="my-2 h-4 px-4 text-xs font-semibold text-ctp-maroon">
      <span v-show="store.error">
        {{ store.error?.message }}
      </span>
    </div>
    <FormLayout :id="props.formName" @keydown="keydown">
      <InputText
        v-model:value="store.newQuestion"
        name="question"
        class="mb-8"
        placeholder="Question"
      />
      <TextareaDefault
        v-model:value="store.newAnswer"
        name="answer"
        placeholder="Enter your answer..."
      />
    </FormLayout>
  </div>
</template>
