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
    class="inline-block rounded px-4 py-1 text-ctp-subtext0 transition duration-100 hover:bg-ctp-crust hover:text-ctp-subtext1"
  >
    <slot />
  </RouterLink>
</template>
