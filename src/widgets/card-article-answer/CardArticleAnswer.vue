<script setup lang="ts">
import { useArticleStore } from '@/entities/customer';
import { CardLayout } from '@/shared/ui';

const store = useArticleStore()
</script>

<template>
  <CardLayout>
    <p>
      {{ store.answer }}
    </p>
  </CardLayout>
</template>
