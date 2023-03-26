<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';

import { ButtonFlat } from '@/shared/ui';

import { useThemeStore } from './store';

const store = useThemeStore()

const switchTheme = () => {
  store.onSwtich()
}

const body = ref(document.querySelector('body'))

// body.value?.classList.add('frappe')

</script>

<template>
  <ButtonFlat
    class="text-xs !px-2 hover:!bg-ctp-mantle"
    @click="switchTheme"
  >
    <FontAwesomeIcon :icon="['fas', 'sun']" />
  </ButtonFlat>
</template>
