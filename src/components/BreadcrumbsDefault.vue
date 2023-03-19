<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const linksArr = computed(() => {
  const routeNames = route.path.split('/').slice(1)

  const arr: { name: string; path: string }[] = []
  let path = ''
  for (const name of routeNames) {
    path += '/' + name
    arr.push({
      name,
      path
    })
  }
  return arr
})
</script>
<template>
  <nav class="flex items-center gap-1 text-sm">
    <RouterLink
      :to="{ name: 'home' }"
      class="rounded-md px-2 py-1 text-ctp-rosewater transition duration-75 hover:bg-ctp-mantle"
    >
      <FontAwesomeIcon :icon="['fas', 'home']" />
    </RouterLink>
    <div v-for="(link, index) of linksArr" :key="index">
      <FontAwesomeIcon
        :icon="['fas', 'slash']"
        rotation="90"
        class="mr-1 text-xs text-ctp-surface1"
      />
      <RouterLink
        :to="link.path"
        class="rounded-md p-1 text-ctp-rosewater transition duration-75 hover:bg-ctp-mantle"
        >{{ link.name }}</RouterLink
      >
    </div>
  </nav>
</template>

<style scoped>
.router-link-exact-active {
  pointer-events: none;
}
</style>
