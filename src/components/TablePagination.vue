<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'

const props = defineProps<{
  total: number
}>()

const emit = defineEmits<{
  (event: 'update', startItem: number, endItem: number): void
}>()

const itemsPerPage = ref(5)
const currentPage = ref(1)

const start = computed(() => {
  return itemsPerPage.value * (currentPage.value - 1) + 1
})

const end = computed(() => {
  if (itemsPerPage.value * currentPage.value > props.total) {
    return props.total
  }
  return itemsPerPage.value * currentPage.value
})

const totalPages = computed(() => {
  return Math.ceil(props.total / itemsPerPage.value)
})

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}

const visiblePages = computed(() => {
  if (currentPage.value <= 4 && totalPages.value <= 4) {
    return [...range(1, totalPages.value)]
  } else if (currentPage.value <= 3) {
    return [...range(1, 3), -1, totalPages.value]
  } else if (currentPage.value >= 2 && currentPage.value <= totalPages.value - 2) {
    return [1, -1, ...range(currentPage.value - 1, currentPage.value + 1), -1, totalPages.value]
  } else {
    return [1, -1, ...range(totalPages.value - 2, totalPages.value)]
  }
})

const isCurrentPage = (page: number) => {
  return page === currentPage.value
}

const updatePage = (numberPage: number) => {
  currentPage.value = numberPage

  emit('update', start.value, end.value)
}
</script>

<template>
  <div class="flex items-center gap-1">
    <div>Viewing {{ start }} to {{ end }} of {{ props.total }}</div>
    <button
      :disabled="currentPage <= 1"
      @click="() => updatePage(currentPage - 1)"
      class="rounded px-2 py-1 transition duration-75 hover:bg-ctp-surface0 hover:text-ctp-base disabled:text-ctp-overlay1 disabled:hover:bg-inherit"
    >
      <FontAwesomeIcon :icon="['fas', 'angle-left']" />
    </button>
    <button
      v-for="(item, index) of visiblePages"
      :key="index"
      :class="{
        'text-ctp-peach': isCurrentPage(item),
        'disabled:text-ctp-peach': isCurrentPage(item)
      }"
      :disabled="item === -1 || isCurrentPage(item)"
      @click="() => updatePage(item)"
      class="rounded px-2 py-1 transition duration-75 hover:bg-ctp-surface0 hover:text-ctp-base disabled:text-ctp-overlay1 disabled:hover:bg-inherit"
    >
      {{ item !== -1 ? item : '...' }}
    </button>
    <button
      :disabled="currentPage >= totalPages"
      @click="() => updatePage(currentPage + 1)"
      class="rounded px-2 py-1 transition duration-75 hover:bg-ctp-surface0 hover:text-ctp-base disabled:text-ctp-overlay1 disabled:hover:bg-inherit"
    >
      <FontAwesomeIcon :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>
