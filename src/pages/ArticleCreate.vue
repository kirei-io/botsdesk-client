<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute, useRouter } from 'vue-router'

import { useArticleStore, useTagStore } from '@/entities/customer'
import { ButtonRaised } from '@/shared/ui'
import { ArticleForm } from '@/widgets/form-article'
import { HeaderArticle } from '@/widgets/header-article'

const formName = 'create-article-form'

const store = useArticleStore()
const tag = useTagStore()
const route = useRoute()
const router = useRouter()

const submit = () => {
  let tags: string[] | undefined = undefined
  if (tag.selectedTag.size) {
    tags = Array.from(tag.selectedTag)
  }
  store.onCreateArticle(String(route.params.business_id), tags)
  if (!store.error) {
    router.back()
  }
}

const reset = () => {
  store.onNewValuesReset()
}
</script>

<template>
  <HeaderArticle>
    <ButtonRaised :form="formName">
      <FontAwesomeIcon :icon="['fas', 'save']" class="mr-1 text-xs" />
      Create
    </ButtonRaised>
    <ButtonRaised @click="reset">
      <FontAwesomeIcon :icon="['fas', 'rotate-left']" class="mr-1 text-xs" />
      Reset
    </ButtonRaised>
  </HeaderArticle>
  <ArticleForm :form-name="formName" @submit.prevent="submit" />
</template>
