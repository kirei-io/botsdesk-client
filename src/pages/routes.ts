import type { RouteRecordRaw } from 'vue-router'

import { useAuthStore } from '@/entities/authentication'
import { useBusinessStore } from '@/entities/customer'
import { ROUTE_NAME, ROUTE_PATH } from '@/shared/config'

import HomeLayout from './HomeLayout.vue'
import NotFound from './NotFound.vue'

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: ROUTE_NAME.HOME,
    component: () => import('./HomePage.vue')
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_LIST],
    name: ROUTE_NAME.ARTICLE_LIST,
    component: () => import('./ArticleList.vue')
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_CREATE],
    name: ROUTE_NAME.ARTICLE_CREATE,
    component: () => import('./ArticleCreate.vue')
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_VIEW],
    name: ROUTE_NAME.ARTICLE_VIEW,
    component: () => import('./ArticlePage.vue')
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_EDIT],
    name: ROUTE_NAME.ARTICLE_EDIT,
    component: () => import('./ArticleEdit.vue')
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATH[ROUTE_NAME.HOME],
    component: HomeLayout,
    children: homeRoutes,
    meta: {
      isReqAuth: true
    }
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.LOGIN],
    name: ROUTE_NAME.LOGIN,
    component: () => import('./LoginPage.vue'),
    beforeEnter: () => {
      useBusinessStore().$reset()
      localStorage.removeItem('access_token')
    }
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.NOT_FOUND],
    name: ROUTE_NAME.NOT_FOUND,
    component: NotFound
  }
]
