<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useArticlesListStore, useBusinessStore, useTagStore } from '@/entities/customer/'
import { ROUTE_NAME } from '@/shared/config'
import { ButtonFlat, HeaderLayout, RouteButtonRaised } from '@/shared/ui'
import { ArticleTable } from '@/widgets/table-article'
import { TablePagination } from '@/widgets/table-pagination'

const route = useRoute()
const store = useArticlesListStore()
const businessStore = useBusinessStore()
const selectedBusiness = computed(() => String(route.params.business_id ?? ''))
const tag = useTagStore()
const selectedTags = computed(() => Array.from(tag.selectedTag))
const selectOnlyFilter = computed(() => store.articlesOnlyFilter)
const title = computed(() => {
  return businessStore.businessMap.get(String(route.params.business_id))?.name
})

watch(selectedBusiness, () => {
  if (selectedBusiness.value) {
    console.log(selectedBusiness.value)
    store.onArticlesList(selectedBusiness.value)
  }
})

watch(selectedTags, () => {
  if (selectedBusiness.value) {
    store.onArticlesList(selectedBusiness.value, 0, 10, selectedTags.value)
  }
})

watch(selectOnlyFilter, () => {
  if (selectedBusiness.value) {
    store.onArticlesList(selectedBusiness.value, 0, 10, selectedTags.value, selectOnlyFilter.value)
  }
})

const nextPage = (skip: number, limit: number) => {
  store.onArticlesList(String(route.params.business_id), skip - 1, limit)
}

onMounted(() => {
  store.onArticlesList(String(route.params.business_id), 0, 10, selectedTags.value)
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
        <FontAwesomeIcon
          :icon="['fas', 'plus']"
          class="mr-2"
        />
        <span>Create new</span>
      </RouteButtonRaised>
      <div>
        <ButtonFlat
          class="text-sm"
          :class="{ '!text-ctp-rosewater': store.articlesOnlyFilter === 'all' }"
          @click="() => (store.articlesOnlyFilter = 'all')"
        >
          All
        </ButtonFlat>
        <ButtonFlat
          class="text-sm"
          :class="{ '!text-ctp-rosewater': store.articlesOnlyFilter === 'answered' }"
          @click="() => (store.articlesOnlyFilter = 'answered')"
        >
          Answered
        </ButtonFlat>
        <ButtonFlat
          class="text-sm"
          :class="{ '!text-ctp-rosewater': store.articlesOnlyFilter === 'unanswered' }"
          @click="() => (store.articlesOnlyFilter = 'unanswered')"
        >
          Unanswered
        </ButtonFlat>
      </div>
    </div>

    <TablePagination
      :total="store.totalArticles ?? 0"
      @update="nextPage"
    />
  </HeaderLayout>
  <ArticleTable />
</template>
