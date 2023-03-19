<script setup lang="ts">
const props = defineProps<{
  type: string
  inputName: string
  label: string
  placeholder?: string
  validationText?: string
  isValid?: boolean
}>()
</script>
<template>
  <div>
    <label :for="props.inputName" class="mb-1 block px-2 text-sm font-medium text-ctp-subtext0">
      {{ props.label }}
    </label>
    <input
      :type="props.type"
      :name="props.inputName"
      :id="props.inputName"
      :placeholder="props.placeholder"
      class="mb-1 block w-full rounded border border-transparent bg-ctp-crust px-2 py-3 shadow-sm placeholder:text-ctp-overlay1 focus:border-ctp-lavender focus:bg-ctp-base focus:outline-none"
    />
    <div v-if="props.validationText && !!props.isValid" class="mb-2 px-2 text-sm text-ctp-maroon">
      {{ props.validationText }}
    </div>
  </div>
</template>
