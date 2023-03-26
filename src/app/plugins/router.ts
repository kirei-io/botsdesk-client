import { createRouter, createWebHistory } from 'vue-router'

import { routes } from '@/pages'
import { ROUTE_NAME } from '@/shared/config'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.isReqAuth && !localStorage.getItem('access_token')) {
    next({ name: ROUTE_NAME.LOGIN })
  } else {
    next()
  }
})
