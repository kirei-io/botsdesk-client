import ArticleCreate from '@/views/ArticleCreate.vue'
import ArticleEdit from '@/views/ArticleEdit.vue'
import ArticlesList from '@/views/ArticlesList.vue'
import ArticleView from '@/views/ArticleView.vue'
import BusinessesList from '@/views/BusinessesList.vue'
import HomeLayout from '@/views/HomeLayout.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'
import SignupView from '@/views/SignupView.vue'
import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from './routeName'
import { ROUTE_PATH } from './routePath'

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: ROUTE_NAME.HOME,
    component: HomeView
  },

  //TODO: REMOVE THIS ROUTE
  {
    path: '/business',
    name: 'business.list',
    meta: {
      title: 'Businesses List'
    },
    component: BusinessesList
    // beforeEnter: [removeQueryParams, removeHash]
  },

  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_LIST],
    name: ROUTE_NAME.ARTICLE_LIST,
    component: ArticlesList
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_CREATE],
    name: ROUTE_NAME.ARTICLE_CREATE,
    component: ArticleCreate
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_VIEW],
    name: ROUTE_NAME.ARTICLE_VIEW,
    component: ArticleView
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.ARTICLE_EDIT],
    name: ROUTE_NAME.ARTICLE_EDIT,
    component: ArticleEdit
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATH[ROUTE_NAME.HOME],
    component: HomeLayout,
    children: homeRoutes
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.LOGIN],
    name: ROUTE_NAME.LOGIN,
    component: LoginView
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.SIGNUP],
    name: ROUTE_NAME.SIGNUP,
    component: SignupView
  },
  {
    path: ROUTE_PATH[ROUTE_NAME.NOT_FOUND],
    name: ROUTE_NAME.NOT_FOUND,
    component: NotFound
  }
]
