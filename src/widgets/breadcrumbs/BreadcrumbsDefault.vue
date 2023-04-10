<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useArticleStore, useBusinessStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { RouteButtonFlat } from '@/shared/ui'

const route = useRoute()

const businessStore = useBusinessStore()
const articleStore = useArticleStore()

const routePath = computed(() => route.path.split('/').slice(1))

const routes = computed(() => {
  let routes: {
    name: string
    params: Record<string, string | string[]>
    title: string
  }[] = []

  routePath.value.forEach((path, index, arr) => {
    switch (path) {
      case 'business':
        routes = [
          {
            name: ROUTE_NAME.ARTICLE_LIST,
            params: {
              business_id: route.params.business_id
            },
            title:
              businessStore.businessMap.get(String(route.params.business_id))?.name ??
              'Articles list'
          }
        ]
        break

      case 'article':
        if (/\d/.test(String(arr[index + 1]))) {
          routes = [
            routes[0],
            {
              name: ROUTE_NAME.ARTICLE_VIEW,
              params: {
                business_id: route.params.business_id
              },
              title: articleStore.question ?? 'Article'
            }
          ]
        }
        break

      case 'edit':
        routes = [
          routes[0],
          routes[1],
          {
            name: ROUTE_NAME.ARTICLE_EDIT,
            params: {
              business_id: route.params.business_id,
              id: route.params.id
            },
            title: 'Edit'
          }
        ]
        break

      case 'create':
        routes = [
          routes[0],
          {
            name: ROUTE_NAME.ARTICLE_CREATE,
            params: {
              business_id: route.params.business_id
            },
            title: 'Create'
          }
        ]
        break
      default:
        break
    }
  })

  return routes
})
</script>

<template>
  <nav>
    <RouteButtonFlat
      :to="{ name: ROUTE_NAME.HOME }"
      class="!px-2 !py-1 !text-ctp-rosewater hover:bg-ctp-mantle hover:text-ctp-rosewater"
    >
      <FontAwesomeIcon
        :icon="['fas', 'house']"
        class="text-xs"
      />
    </RouteButtonFlat>
    <FontAwesomeIcon
      :icon="['fas', 'slash']"
      rotation="90"
      class="mx-1 text-xs text-ctp-surface2"
    />
    <span
      v-for="(link, index) of routes"
      :key="index"
    >
      <RouteButtonFlat
        :to="{
          name: link.name
        }"
        :class="
          route.name === link.name ? 'pointer-events-none !text-ctp-overlay2' : '!text-ctp-rosewater'
        "
        class="!p-1 font-medium hover:bg-ctp-mantle hover:text-ctp-rosewater"
      >
        {{ link.title }}
      </RouteButtonFlat>

      <FontAwesomeIcon
        :icon="['fas', 'slash']"
        rotation="90"
        class="mx-1 text-xs text-ctp-surface2"
      />
    </span>
  </nav>
</template>

<style>
</style>
