<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router';
interface RouterButtonProps {
  to: RouteLocationRaw
}
const props = defineProps<RouterButtonProps>()

</script>

<template>
  <RouterLink
    class="rounded-md px-4 py-1 text-ctp-subtext0 border-ctp-surface0 transition duration-150 hover:bg-ctp-crust hover:text-ctp-subtext1 active:bg-ctp-surface0"
    :to="props.to"
  >
    <slot />
  </RouterLink>
</template>

