<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useArticlesListStore, useBusinessStore } from '@/entities/customer/'
import { ROUTE_NAME } from '@/shared/config'
import { HeaderLayout, RouteButtonRaised } from '@/shared/ui'
import { ArticleTable } from '@/widgets/table-article'
import { TablePagination } from '@/widgets/table-pagination'

const route = useRoute()
const store = useArticlesListStore()
const businessStore = useBusinessStore()

const title = computed(() => {
  return businessStore.businessMap.get(String(route.params.business_id))?.name
})

watch(route, () => {
  if (route.params.business_id) {
    store.onArticlesList(String(route.params.business_id))
  }
})

const nextPage = (skip: number, limit: number) => {
  // TODO: add skip and limit in route.query
  store.onArticlesList(String(route.params.business_id), skip - 1, limit)
}

onMounted(() => {
  store.onArticlesList(String(route.params.business_id))
})
</script>

<template>
  <HeaderLayout class="flex justify-between">
    <div class="flex items-center gap-8">
      <h1 class="inline-block text-2xl font-semibold text-ctp-subtext1">
        {{ title }}
      </h1>
      <RouteButtonRaised
        :to="{ name: ROUTE_NAME.ARTICLE_CREATE, params: route.params }"
        class="py-1"
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-2" />
        <span>Create new</span>
      </RouteButtonRaised>
    </div>
    <TablePagination :total="store.totalArticles ?? 0" @update="nextPage" />
  </HeaderLayout>
  <ArticleTable />
</template>
