<script setup lang="ts">
import { useBusinessStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { CardLayout, RouteLinkInline } from '@/shared/ui'
const store = useBusinessStore()
</script>
<template>
  <main>
    <h1 class="mb-3 inline-block py-1 text-xl font-semibold text-ctp-subtext0">Home</h1>
    <CardLayout>
      <h3 class="mb-2 font-semibold !text-ctp-subtext0">Select your project:</h3>
      <ul>
        <li v-for="[id, business] of store.businessMap" :key="id" class="mb-1">
          <RouteLinkInline
            :to="{
              name: ROUTE_NAME.ARTICLE_LIST,
              params: {
                business_id: id
              }
            }"
          >
            {{ business.name }}
          </RouteLinkInline>
        </li>
      </ul>
    </CardLayout>
  </main>
</template>
