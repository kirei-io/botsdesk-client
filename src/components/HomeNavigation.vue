<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LinkButtonOutlineVue from './LinkButtonOutline.vue'
</script>
<template>
  <nav class="flex min-h-screen w-80 flex-col gap-2 bg-ctp-mantle py-2 px-4 shadow">
    <LinkButtonOutlineVue name="home">
      <FontAwesomeIcon :icon="['fas', 'house']" class="mr-2" />
      Home
    </LinkButtonOutlineVue>
    <LinkButtonOutlineVue name="business.list">
      <FontAwesomeIcon :icon="['fas', 'briefcase']" class="mr-2" />
      Businesses List
    </LinkButtonOutlineVue>
  </nav>
</template>
