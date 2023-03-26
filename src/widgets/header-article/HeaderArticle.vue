<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useArticleStore } from '@/entities/customer';
import { ROUTE_NAME } from '@/shared/config';
import { ButtonFlat, HeaderLayout } from '@/shared/ui';


const store = useArticleStore()
const router = useRouter()
const route = useRoute()

const title = computed(() => route.name === ROUTE_NAME.ARTICLE_CREATE ? 'Create new Article' : store.question ?? 'Article')
</script>

<template>
  <HeaderLayout class="flex justify-between pt-2 pb-2">
    <div>
      <ButtonFlat
        class="mr-3 !px-2 !py-1"
        @click="() => router.back()"
      >
        <FontAwesomeIcon :icon="['fas', 'arrow-left-long']" />
      </ButtonFlat>
      <h1 class="inline-block mb-3 text-xl font-semibold text-ctp-subtext0">{{
        title }}
      </h1>
      <div class="flex gap-4">
        <slot />
      </div>
    </div>
    <div
      v-if="store.created && store.updated"
      class="mb-4 text-right text-sm text-ctp-overlay1"
    >
      <div>Created at: {{ store.created }}</div>
      <div>Updated at: {{ store.updated }}</div>
    </div>
  </HeaderLayout>
</template>
