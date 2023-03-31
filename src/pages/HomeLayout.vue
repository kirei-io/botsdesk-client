<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterView, useRouter } from 'vue-router'

import { useAuthStore } from '@/entities/authentication'
import { ROUTE_NAME } from '@/shared/config'
import { LoadingSpinner, RouteButtonFlat } from '@/shared/ui'
import { BreadcrumbsDefault } from '@/widgets/breadcrumbs'
import { SidebarHome } from '@/widgets/sidebar'
import { ThemeButton } from '@/widgets/theme-button'

const router = useRouter()
const store = useAuthStore()

router.beforeEach((to) => {
  if (to.name === ROUTE_NAME.LOGIN) {
    store.onLogout()
  }
})
</script>

<template>
  <div class="flex w-full">
    <LoadingSpinner />
    <SidebarHome />
    <div class="container relative mx-auto max-w-5xl p-4">
      <div class="mb-4 flex justify-between">
        <BreadcrumbsDefault />
        <div>
          <ThemeButton />
          <RouteButtonFlat :to="{ name: ROUTE_NAME.LOGIN }" class="ml-2 !px-2 hover:!bg-ctp-mantle">
            <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" />
            Logout
          </RouteButtonFlat>
        </div>
      </div>
      <RouterView />
    </div>
  </div>
</template>
