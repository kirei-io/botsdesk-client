<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'

import { range } from '@/shared/lib'
import { ButtonFlat } from '@/shared/ui'
interface TablePagination {
  total: number
}
const props = defineProps<TablePagination>()

const emit = defineEmits<{
  (event: 'update', skip: number, limit: number): void
}>()

const itemsPerPage = ref(10)
const currentPage = ref(1)

const skip = computed(() => {
  return itemsPerPage.value * (currentPage.value - 1) + 1
})

const limit = computed(() => {
  const limit = itemsPerPage.value * currentPage.value
  if (limit > props.total) {
    return props.total
  }
  return limit
})

const totalPages = computed(() => {
  return Math.ceil(props.total / itemsPerPage.value)
})

const isCurrentPage = (page: number) => {
  return page === currentPage.value
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

const updatePage = (page: number) => {
  currentPage.value = page
  emit('update', skip.value, limit.value)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="text-sm text-ctp-subtext0">
      Viewing {{ skip }} to {{ limit }} of {{ props.total }}
    </div>

    <div>
      <ButtonFlat
        :disabled="currentPage <= 1"
        @click="() => updatePage(currentPage - 1)"
        class="!px-2 !py-1"
      >
        <FontAwesomeIcon :icon="['fas', 'angle-left']" class="text-sm" />
      </ButtonFlat>
      <!-- arrow left -->

      <ButtonFlat
        v-for="(item, index) of visiblePages"
        :key="index"
        :disabled="item === -1 || isCurrentPage(item)"
        @click="() => updatePage(item)"
        :class="{ 'disabled:!text-ctp-rosewater': isCurrentPage(item) }"
        class="!px-2 !py-1 text-sm font-semibold"
      >
        {{ item !== -1 ? item : '...' }}
      </ButtonFlat>
      <!-- pages -->

      <ButtonFlat
        :disabled="currentPage >= totalPages"
        @click="() => updatePage(currentPage + 1)"
        class="!px-2 !py-1"
      >
        <FontAwesomeIcon :icon="['fas', 'angle-right']" class="text-sm" />
      </ButtonFlat>
    </div>
  </div>
</template>
