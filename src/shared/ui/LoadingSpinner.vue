<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { useArticlesListStore, useArticleStore, useBusinessStore } from '@/entities/customer';


const article = useArticleStore()
const business = useBusinessStore()
const articleList = useArticlesListStore()
</script>

<template>
  <div
    v-show="article.isLoading || business.isLoading || articleList.isLoading"
    class="absolute min-h-screen w-screen z-50 backdrop-blur-sm flex items-center"
  >
    <div class="mx-auto text-center text-ctp-subtext0">
      <FontAwesomeIcon
        :icon="['fas', 'spinner']"
        :pulse="true"
        class="text-5xl mb-4"
      />
      <div class="font-semibold">
        Loading...
      </div>
    </div>
  </div>
</template>
