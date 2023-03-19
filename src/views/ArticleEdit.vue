<script setup lang="ts">
import ArticleHeader from '@/components/ArticleHeader.vue'
import ButtonDefault from '@/components/ButtonDefault.vue'
import HomeFormDefault from '@/components/HomeFormDefault.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const question = ref<string>('')
const answer = ref<string>('')

const submit = () => {
  console.log(question.value, answer.value)
  router.go(-2)
}
</script>

<template>
  <ArticleHeader title="Edit Article" created_at="10 Mar 2023" updated_at="10 Mar 2023">
    <ButtonDefault class="mr-4" form="aticle-edit-form" @click.prevent="submit">
      <FontAwesomeIcon :icon="['fas', 'save']" class="mr-2" />
      Save
    </ButtonDefault>
  </ArticleHeader>
  <main>
    <HomeFormDefault
      form-id="aticle-edit-form"
      v-model:answer="answer"
      v-model:question="question"
    />
  </main>
</template>
