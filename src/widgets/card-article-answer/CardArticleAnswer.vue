<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'

import { useArticleStore } from '@/entities/customer'
import { CardLayout } from '@/shared/ui'

const store = useArticleStore()
const html = computed(() => marked.parse(store.answer_md ?? ''), {})
</script>

<template>
  <CardLayout>
    <div v-html="html" class="answer"></div>
  </CardLayout>
</template>

<style>
.answer > h1 {
  font-size: 2rem;
  line-height: 2;
}

h2 {
  font-size: 1.5rem;
  line-height: 2;
}

ol {
  padding-left: 2rem;
  list-style-type: decimal;
}

ul {
  padding-left: 2rem;
  list-style-type: disc;
}

code {
  padding: 0.4rem;
  background-color: rgb(var(--ctp-crust));
  line-height: 2;
  border-radius: 0.25rem;
}

.answer > hr {
  border-color: rgb(var(--ctp-surface1));
}

.answer > blockquote {
  padding: 0.5rem;
  background-color: rgb(var(--ctp-surface0));
  margin: 0.5rem 0;
  color: rgb(var(--ctp-subtext0));
  border-radius: 0.25rem;
}
</style>
