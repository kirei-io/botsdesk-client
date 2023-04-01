<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { RouteButtonFlat } from '@/shared/ui'

interface NavLinkProps {
  to: RouteLocationRaw
  label: string
  language?: string
  icon?: [string, string]
  isSelected?: boolean
}

const props = defineProps<NavLinkProps>()
const rotateIcon = computed(() => {
  if (typeof props.isSelected === 'boolean') {
    return props.isSelected ? 90 : undefined
  } else {
    return undefined
  }
})
</script>

<template>
  <RouteButtonFlat :to="props.to" class="relative truncate !px-4 !py-1">
    <FontAwesomeIcon
      v-if="props.icon"
      :icon="props.icon"
      class="mr-2 text-xs"
      :rotation="rotateIcon"
    />
    <span class="font-medium">{{ props.label }}</span>
    <span
      v-if="props.language"
      class="absolute top-[7px] ml-2 rounded bg-ctp-surface2 px-[2px] text-[10px] text-ctp-base"
      >{{ props.language.slice(0, 3).toUpperCase() }}</span
    >
  </RouteButtonFlat>
</template>
