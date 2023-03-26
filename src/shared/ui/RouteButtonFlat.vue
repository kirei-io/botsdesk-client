<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router'
interface RouterButtonProps {
  to: RouteLocationRaw
}
const props = defineProps<RouterButtonProps>()
</script>

<template>
  <RouterLink
    class="rounded-md border-ctp-surface0 px-4 py-1 text-ctp-subtext0 transition duration-150 hover:bg-ctp-crust hover:text-ctp-subtext1 active:bg-ctp-surface0"
    :to="props.to"
  >
    <slot />
  </RouterLink>
</template>
