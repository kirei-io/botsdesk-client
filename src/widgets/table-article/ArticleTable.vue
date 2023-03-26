<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useArticlesListStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { RouteLinkInline, TableCell, TableHeader, TableLayout, TableRow } from '@/shared/ui'

const route = useRoute()
const store = useArticlesListStore()
</script>

<template>
  <TableLayout>
    <template #header>
      <TableHeader class="w-1/12">Id</TableHeader>
      <TableHeader class="w-5/12">Question</TableHeader>
      <TableHeader class="w-3/12">Created at</TableHeader>
      <TableHeader class="w-3/12">Updated at</TableHeader>
    </template>
    <template #body>
      <TableRow v-for="article of store.articlesList" :key="article.article_id">
        <TableCell>
          {{ article.article_id }}
        </TableCell>
        <TableCell>
          <RouteLinkInline
            :to="{
              name: ROUTE_NAME.ARTICLE_VIEW,
              params: {
                ...route.params,
                id: article.article_id
              }
            }"
          >
            {{ article.question_md }}
          </RouteLinkInline>
        </TableCell>
        <TableCell>
          {{ new Date(article.created_at).toLocaleString() }}
        </TableCell>
        <TableCell>
          {{ new Date(article.updated_at).toLocaleString() }}
        </TableCell>
      </TableRow>
    </template>
  </TableLayout>
  <div v-if="!store.totalArticles" class="mt-10 w-full text-center font-semibold text-ctp-overlay1">
    <span class="rounded bg-ctp-mantle p-2"> No items </span>
  </div>
</template>
