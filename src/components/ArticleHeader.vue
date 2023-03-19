<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import ButtonOutline from './ButtonOutline.vue'
import HomeHeader from './HomeHeader.vue'

const props = defineProps<{
  title: string
  created_at?: string
  updated_at?: string
}>()
const router = useRouter()

const back = () => {
  router.go(-1)
}
</script>

<template>
  <HomeHeader>
    <div>
      <div class="mb-2">
        <ButtonOutline @click="back" class="mr-4">
          <FontAwesomeIcon :icon="['fas', 'arrow-left-long']" />
        </ButtonOutline>
        <h1 class="mr-6 inline-block text-xl font-semibold text-ctp-subtext0">
          {{ title }}
        </h1>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>

    <div
      v-if="props.created_at || props.updated_at"
      class="mb-4 text-right text-sm text-ctp-overlay1"
    >
      <div v-if="props.created_at">Created at: {{ created_at }}</div>
      <div v-if="props.updated_at">Updated at: {{ updated_at }}</div>
    </div>
  </HomeHeader>
</template>
