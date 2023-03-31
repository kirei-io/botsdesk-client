<script setup lang="ts">
import { useArticleStore } from '@/entities/customer'
import { capitalizeFirstChar, formatDate } from '@/shared/lib'
import { CardLayout } from '@/shared/ui'

const store = useArticleStore()
</script>

<template>
  <div class="flex flex-col">
    <h3 class="font-semibold text-ctp-subtext0">Users waiting for a response</h3>
    <CardLayout
      v-for="(ask, index) of store.askArticles"
      :key="index"
      class="mt-2 flex flex-col gap-1"
    >
      <div>Created at: {{ formatDate(ask.created_at) }}</div>

      <div>
        From {{ capitalizeFirstChar(String(ask.channel.kind)) }}:
        {{ ask.channel.speaking_name }}
      </div>

      <div>
        User:
        <a
          :href="ask.author_link"
          class="mb-2 max-w-max border-b-2 border-dotted border-ctp-rosewater text-ctp-rosewater transition-colors duration-150 ease-in-out hover:border-ctp-subtext0 hover:text-ctp-subtext0"
        >
          {{ ask.author }}
        </a>
      </div>
    </CardLayout>
  </div>
</template>
