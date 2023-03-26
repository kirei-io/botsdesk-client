<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { RouteLocationRaw } from 'vue-router';

import { RouteButtonFlat } from '@/shared/ui';

interface NavLinkProps {
  to: RouteLocationRaw
  label: string
  language?: string
  icon?: [string, string]
}


const props = defineProps<NavLinkProps>()

</script>

<template>
  <RouteButtonFlat
    :to="props.to"
    class="!px-4 !py-1 truncate relative"
  >
    <FontAwesomeIcon
      v-if="props.icon"
      :icon="props.icon"
      class="mr-2 text-xs"
    />
    <span class="font-medium">{{ props.label }}</span>
    <span
      v-if="props.language"
      class="absolute text-[10px] px-[2px] ml-2 top-[7px] rounded bg-ctp-surface2 text-ctp-base"
    >{{ props.language.slice(0, 3).toUpperCase() }}</span>
  </RouteButtonFlat>
</template>
