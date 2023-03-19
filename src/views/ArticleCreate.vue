<script setup lang="ts">
import ArticleHeader from '@/components/ArticleHeader.vue'
import ButtonDefault from '@/components/ButtonDefault.vue'
import HomeFormDefault from '@/components/HomeFormDefault.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const answer = ref<string>('')
const question = ref<string>('')

const router = useRouter()

const submit = () => {
  router.go(-1)
  console.log(answer.value, question.value)
}
</script>

<template>
  <ArticleHeader title="Create new Article">
    <ButtonDefault @click.prevent="submit" form="form-article-create"> Create </ButtonDefault>
  </ArticleHeader>

  <HomeFormDefault
    v-model:answer="answer"
    v-model:question="question"
    form-id="form-article-create"
  />
</template>
