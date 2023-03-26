<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useArticlesListStore, useArticleStore, useBusinessStore } from '@/entities/customer'

const article = useArticleStore()
const business = useBusinessStore()
const articleList = useArticlesListStore()
</script>

<template>
  <div
    v-show="article.isLoading || business.isLoading || articleList.isLoading"
    class="absolute z-50 flex min-h-screen w-screen items-center backdrop-blur-sm"
  >
    <div class="mx-auto text-center text-ctp-subtext0">
      <FontAwesomeIcon :icon="['fas', 'spinner']" :pulse="true" class="mb-4 text-5xl" />
      <div class="font-semibold">Loading...</div>
    </div>
  </div>
</template>
