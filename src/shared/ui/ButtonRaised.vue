<script setup lang="ts">
interface ButtonProps {
  disabled?: boolean
}
const props = defineProps<ButtonProps>()
</script>

<template>
  <button
    :disabled="props.disabled"
    class="inline-block rounded-lg bg-ctp-crust px-4 py-1 shadow-sm transition duration-75 hover:bg-ctp-surface0 active:translate-y-px"
  >
    <slot />
  </button>
</template>
