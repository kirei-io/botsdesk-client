<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useArticleStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { ButtonRaised, CardLayout, RouteButtonRaised } from '@/shared/ui'
import { AskArticleList } from '@/widgets/ask-article-list'
import { CardArticleAnswer } from '@/widgets/card-article-answer'
import { HeaderArticle } from '@/widgets/header-article'

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const businessId = String(route.params.business_id)
const articleId = String(route.params.id)

const deleteArticle = () => {
  store.onDeleteAtrticle(businessId, articleId)
  router.push({
    name: ROUTE_NAME.ARTICLE_LIST,
    params: {
      business_id: route.params.business_id
    }
  })
}

onMounted(async () => {
  store.onArticle(businessId, articleId)
  if (!store.answer) {
    store.onAskArticle(businessId, articleId)
  }
})

onBeforeUnmount(() => {
  store.$reset()
})
</script>

<template>
  <main>
    <HeaderArticle>
      <RouteButtonRaised
        :to="{ name: ROUTE_NAME.ARTICLE_EDIT, params: route.params }"
      >
        <FontAwesomeIcon
          :icon="['fas', 'pen']"
          class="mr-2 text-xs"
        />
        Edit
      </RouteButtonRaised>
      <ButtonRaised
        @click="deleteArticle"
        v-show="false"
      > Delte </ButtonRaised>
    </HeaderArticle>
    <div class="mt-8">
      <CardLayout
        class="flex gap-x-4 gap-y-2 flex-wrap mb-8"
        v-if="!!store.articleTags.size"
      >
        <div class="text-ctp-overlay1 px-2 py-1 font-semibold">Tags</div>
        <div
          v-for="tag, index of store.articleTags"
          :key="index"
          class="bg-ctp-crust max-w-fit px-4 py-1 rounded"
        >
          {{ tag.name }}
        </div>
      </CardLayout>
      <CardArticleAnswer v-if="store.answer_md" />
      <AskArticleList v-else-if="store.askArticles.length" />
      <CardLayout
        v-else-if="!store.isLoading"
        class="text-lg font-semibold text-ctp-overlay1"
      >
        This article has no answer
      </CardLayout>
    </div>
  </main></template>
