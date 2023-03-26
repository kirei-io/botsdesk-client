<script setup lang="ts">
interface FormProps {
  id: string
}

const props = defineProps<FormProps>()
</script>

<template>
  <form :id="props.id" class="flex flex-col">
    <slot />
  </form>
</template>
