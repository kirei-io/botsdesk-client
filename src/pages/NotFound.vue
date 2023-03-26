<script setup lang="ts">
import { ROUTE_NAME } from '@/shared/config';
import { CardLayout, RouteLinkInline } from '@/shared/ui';

</script>

<template>
  <div class="mx-auto pt-32 w-fit">
    <CardLayout class="text-center px-10 py-6">
      <h1 class="font-bold text-4xl">404</h1>
      <h3 class="font-semibold text-ctp-subtext0">Page not found</h3>
      <RouteLinkInline :to="{ name: ROUTE_NAME.HOME }">
        Back to home
      </RouteLinkInline>
    </CardLayout>
  </div>
</template>
