<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router'
interface RouterButtonProps {
  to: RouteLocationRaw
}
const props = defineProps<RouterButtonProps>()
</script>

<template>
  <RouterLink
    :to="props.to"
    class="inline border-b-2 border-dotted border-ctp-rosewater text-ctp-rosewater transition-colors duration-150 ease-in-out hover:border-ctp-subtext0 hover:text-ctp-subtext0"
  >
    <slot />
  </RouterLink>
</template>
