<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useArticleStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { ButtonRaised, CardLayout, RouteButtonRaised } from '@/shared/ui'
import { HeaderArticle } from '@/widgets/header-article'

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const deleteArticle = () => {
  store.onDeleteAtrticle(String(route.params.business_id), String(route.params.id))
  router.push({
    name: ROUTE_NAME.ARTICLE_LIST,
    params: {
      business_id: route.params.business_id
    }
  })
}

onMounted(async () => {
  store.onArticle(String(route.params.business_id), String(route.params.id))
})

onBeforeUnmount(() => {
  store.$reset()
})
</script>

<template>
  <main>
    <HeaderArticle>
      <RouteButtonRaised :to="{ name: ROUTE_NAME.ARTICLE_EDIT, params: route.params }">
        <FontAwesomeIcon :icon="['fas', 'pen']" class="mr-2 text-xs" />
        Edit
      </RouteButtonRaised>
      <ButtonRaised @click="deleteArticle" v-show="false"> Delte </ButtonRaised>
    </HeaderArticle>
    <CardLayout class="!mt-10">
      <p v-if="store.answer">
        {{ store.answer ?? '' }}
      </p>
      <div v-if="!store.answer">
        Users waiting for a response
        <a
          v-for="(ask, index) of store.askArticles"
          :key="index"
          :href="ask.author_link"
          class="mb-2 inline border-b-2 border-dotted border-ctp-rosewater text-ctp-rosewater transition-colors duration-150 ease-in-out hover:border-ctp-subtext0 hover:text-ctp-subtext0"
        >
          {{ ask.author }}
        </a>
      </div>
    </CardLayout>
  </main>
</template>
