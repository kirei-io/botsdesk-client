<script setup lang="ts">
import { useArticleStore } from '@/entities/customer';
import { FormLayout, InputText, TextareaDefault } from '@/shared/ui';

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
    <div class="h-4 text-xs text-ctp-maroon px-4 my-2 font-semibold">
      <span v-show="store.error">
        {{ store.error?.message }}
      </span>
    </div>
    <FormLayout
      :id="props.formName"
      @keydown="keydown"
    >
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
