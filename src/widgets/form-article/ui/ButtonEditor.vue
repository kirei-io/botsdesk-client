<script setup lang="ts">
import { ButtonFlat } from '@/shared/ui';

interface ButtonEditorProps {
  isActive: boolean
}

const props = defineProps<ButtonEditorProps>()


</script>
<template>
  <ButtonFlat
    :class="{ 'bg-ctp-lavender/20 !text-ctp-lavender hover:!bg-ctp-lavender/20': props.isActive }"
    class="font-semibold !px-2 min-w-[2.5rem]"
  >
    <slot />
  </ButtonFlat>
</template>
