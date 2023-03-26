<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router'
interface RouterButtonProps {
  to: RouteLocationRaw
}
const props = defineProps<RouterButtonProps>()
</script>

<template>
  <RouterLink
    class="rounded-md bg-ctp-crust px-4 py-1 drop-shadow transition duration-300 ease-in-out active:translate-y-px"
    :to="props.to"
  >
    <slot />
  </RouterLink>
</template>
