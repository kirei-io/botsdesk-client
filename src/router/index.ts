import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAME } from './routeName'
import { ROUTE_PATH } from './routePath'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (to.name !== ROUTE_NAME.LOGIN || store.isAuthenticated) {
    next()
  } else {
    next(ROUTE_PATH[ROUTE_NAME.LOGIN])
  }
})

export default router
