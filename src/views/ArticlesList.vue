<script setup lang="ts">
import HomeHeader from '@/components/HomeHeader.vue'
import LinkButtonDefault from '@/components/LinkButtonDefault.vue'
import TableCell from '@/components/TableCell.vue'
import TableHeader from '@/components/TableHeader.vue'
import TableLayout from '@/components/TableLayout.vue'
import TableRow from '@/components/TableRow.vue'
import TablePagination from '@/components/TablePagination.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink, useRoute } from 'vue-router'
import type { ShortArticleOutput } from '@/types/ArticleOutput'

const route = useRoute()
const articlesColumnHeaders = ['Id', 'Question', 'Created at', 'Updated at']

const articleOutputExample: ShortArticleOutput[] = [
  {
    articleId: 1,
    created_at: '10 mar 2023',
    updated_at: '10 mar 2023',
    question: 'hello?'
  },
  {
    articleId: 442,
    created_at: '10 mar 2023',
    updated_at: '10 mar 2023',
    question: 'Article'
  },
  {
    articleId: 122,
    created_at: '10 mar 2023',
    updated_at: '11 mar 2023',
    question: 'Article 2'
  }
]
</script>

<template>
  <HomeHeader>
    <div class="flex items-center gap-6">
      <h1 class="inline-block text-xl font-semibold text-ctp-subtext0">Articles List</h1>
      <LinkButtonDefault name="article.create">
        <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />
        Create new
      </LinkButtonDefault>
    </div>
    <TablePagination :total="10" />
  </HomeHeader>
  <main>
    <TableLayout>
      <template v-slot:header>
        <TableHeader v-for="(header, index) of articlesColumnHeaders" :key="index">
          {{ header }}
        </TableHeader>
        <TableHeader class="w-8" />
      </template>
      <template v-slot:body>
        <TableRow v-for="(article, index) of articleOutputExample" :key="index">
          <TableCell>
            {{ article.articleId }}
          </TableCell>
          <TableCell>
            <RouterLink
              :to="{ path: `${route.fullPath}/${article.articleId}` }"
              class="underline transition duration-100 hover:text-ctp-rosewater"
            >
              {{ article.question }}
            </RouterLink>
          </TableCell>
          <TableCell>
            {{ article.created_at }}
          </TableCell>
          <TableCell>
            {{ article.updated_at }}
          </TableCell>
          <TableCell>
            <button class="px-2 transition duration-100 hover:text-ctp-maroon">
              <FontAwesomeIcon :icon="['fas', 'trash']" />
            </button>
          </TableCell>
        </TableRow>
      </template>
    </TableLayout>
  </main>
</template>
