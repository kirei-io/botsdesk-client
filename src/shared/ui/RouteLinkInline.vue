<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router';
interface RouterButtonProps {
  to: RouteLocationRaw
}
const props = defineProps<RouterButtonProps>()
</script>

<template>
  <RouterLink
    :to="props.to"
    class="inline text-ctp-rosewater border-b-2 border-dotted hover:text-ctp-subtext0 hover:border-ctp-subtext0 transition-colors duration-150 ease-in-out"
  >
    <slot />
  </RouterLink>
</template>
