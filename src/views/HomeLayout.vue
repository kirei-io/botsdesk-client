<script setup lang="ts">
import HomeNavigation from '@/components/HomeNavigation.vue'
import { RouterView } from 'vue-router'
import BreadcrumbsDefault from '@/components/BreadcrumbsDefault.vue'
import LinkButtonOutline from '@/components/LinkButtonOutline.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="flex w-full">
    <HomeNavigation />
    <div class="container mx-auto max-w-5xl py-2 px-4">
      <div class="flex justify-between">
        <BreadcrumbsDefault class="px-2" />
        <LinkButtonOutline class="px-2 text-sm" name="login">
          <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" class="mr-1" />
          Logout
        </LinkButtonOutline>
      </div>
      <RouterView />
    </div>
  </div>
</template>
