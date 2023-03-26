<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router';
interface RouterButtonProps {
  to: RouteLocationRaw
}
const props = defineProps<RouterButtonProps>()
</script>

<template>
  <RouterLink
    class="bg-ctp-crust rounded-md px-4 py-1 transition duration-300 drop-shadow active:translate-y-px ease-in-out"
    :to="props.to"
  >
    <slot />
  </RouterLink>
</template>

