<script setup lang="ts">
import LinkButtonDefault from '@/components/LinkButtonDefault.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ButtonDefault from '@/components/ButtonDefault.vue'
import { useRoute } from 'vue-router'
import ArticleHeader from '@/components/ArticleHeader.vue'

const route = useRoute()
</script>

<template>
  <ArticleHeader title="Article Name" created_at="10 Mar 2023" updated_at="10 mar 2023">
    <LinkButtonDefault :path="`${route.path}/edit`" class="mr-4">
      <FontAwesomeIcon :icon="['fas', 'pen']" class="mr-2" />
      Edit
    </LinkButtonDefault>
    <ButtonDefault>
      <FontAwesomeIcon :icon="['fas', 'trash']" class="mr-2" />
      Delete
    </ButtonDefault>
  </ArticleHeader>
  <main class="rounded bg-ctp-mantle px-4 py-2 shadow">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi minus itaque eos praesentium
      perspiciatis consequatur eveniet ipsam. Modi, id debitis. Possimus nostrum labore dolore
      quisquam sapiente tempore voluptatem facere doloremque?
    </p>
  </main>
</template>
