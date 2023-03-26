<script setup lang="ts">
import { ROUTE_NAME } from '@/shared/config'
import { CardLayout, RouteLinkInline } from '@/shared/ui'
</script>

<template>
  <div class="mx-auto w-fit pt-32">
    <CardLayout class="px-10 py-6 text-center">
      <h1 class="text-4xl font-bold">404</h1>
      <h3 class="font-semibold text-ctp-subtext0">Page not found</h3>
      <RouteLinkInline :to="{ name: ROUTE_NAME.HOME }"> Back to home </RouteLinkInline>
    </CardLayout>
  </div>
</template>
