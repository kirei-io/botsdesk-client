<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useArticleStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { ButtonRaised } from '@/shared/ui'
import { ArticleForm } from '@/widgets/form-article'
import { HeaderArticle } from '@/widgets/header-article'

const formName = 'form-article-edit'

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const business_id = ref<string>(String(route.params.business_id))
const id = ref<string>(String(route.params.id))

const submit = () => {
  store.onEditArticle(business_id.value, id.value)
  if (!store.error) {
    router.push({
      name: ROUTE_NAME.ARTICLE_VIEW,
      params: route.params
    })
  }
}

onMounted(async () => {
  //TODO: Save store if go from ./../article/:id
  store.onArticle(business_id.value, id.value)
})

onBeforeUnmount(() => {
  store.$reset()
})

const resetValues = () => {
  store.onNewValuesReset()
}
</script>

<template>
  <HeaderArticle>
    <ButtonRaised :form="formName">
      <FontAwesomeIcon :icon="['fas', 'save']" class="mr-1 text-xs" />
      Save
    </ButtonRaised>
    <ButtonRaised @click="resetValues">
      <FontAwesomeIcon :icon="['fas', 'rotate-left']" class="mr-1 text-xs" />
      Reset
    </ButtonRaised>
  </HeaderArticle>
  <ArticleForm :form-name="formName" @submit.prevent="submit" />
</template>
