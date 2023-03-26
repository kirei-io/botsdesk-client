<script setup lang="ts">
import { onMounted } from 'vue'

import { useBusinessStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'

import NavLink from './ui/NavLink.vue'

const store = useBusinessStore()

onMounted(async () => {
  store.onListBusinesses()
})
</script>

<template>
  <nav class="flex min-h-screen w-1/6 flex-col gap-2 bg-ctp-mantle px-2 py-4 shadow-lg">
    <NavLink :to="{ name: ROUTE_NAME.HOME }" :icon="['fas', 'home']" label="Home" class="mb-2" />
    <NavLink
      v-for="([business_id, business], index) of store.businessMap"
      :key="index"
      :to="{
        name: ROUTE_NAME.ARTICLE_LIST,
        params: {
          business_id
        }
      }"
      :label="business.name"
      :language="business.language"
    />
  </nav>
</template>
