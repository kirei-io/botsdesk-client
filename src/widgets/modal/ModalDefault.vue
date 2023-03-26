<script setup lang="ts">
import { CardLayout } from '@/shared/ui'

interface ModalProps {
  isOpen: boolean
  modalClass?: string
}

const props = defineProps<ModalProps>()
const emit = defineEmits<{
  (event: 'close'): void
}>()

const close = () => emit('close')
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150"
      leave-active-class="transition duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      mode="in-out"
    >
      <div v-show="props.isOpen" class="absolute top-0 left-0 z-10 text-ctp-text">
        <CardLayout :class="modalClass" class="absolute top-1/4 left-2/4 z-50 mx-auto">
          <slot />
        </CardLayout>
        <div @click="close" class="min-h-screen w-screen bg-ctp-overlay0 opacity-50"></div>
      </div>
    </Transition>
  </Teleport>
</template>
