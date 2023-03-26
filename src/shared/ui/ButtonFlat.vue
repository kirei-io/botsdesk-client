<script setup lang="ts">
interface ButtonProps {
  disabled?: boolean
}
const props = defineProps<ButtonProps>()
</script>

<template>
  <button
    :disabled="props.disabled"
    class="inline-block rounded px-4 py-1 text-ctp-subtext0 transition duration-100 hover:bg-ctp-crust hover:text-ctp-subtext1 disabled:text-ctp-overlay1 disabled:hover:bg-inherit"
  >
    <slot />
  </button>
</template>
