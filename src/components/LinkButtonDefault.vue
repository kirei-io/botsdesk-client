<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name?: string
  path?: string
}>()

const to = computed(() => {
  const to: {
    name?: string
    path?: string
  } = {}
  if (props.name) {
    to.name = props.name
  }
  if (props.path) {
    to.path = props.path
  }
  return to
})
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-block rounded-lg bg-ctp-crust px-4 py-2 shadow-sm transition duration-75 hover:bg-ctp-surface0 active:translate-y-px"
  >
    <slot />
  </RouterLink>
</template>
