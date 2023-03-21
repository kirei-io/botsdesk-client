import { ROUTE_NAME } from './routeName'

export const ROUTE_PATH = {
  [ROUTE_NAME.HOME]: '/',
  [ROUTE_NAME.ARTICLE_LIST]: '/business/:business_id/article',
  [ROUTE_NAME.ARTICLE_CREATE]: '/business/:business_id/article/create',
  [ROUTE_NAME.ARTICLE_VIEW]: '/business/:business_id/article/:id',
  [ROUTE_NAME.ARTICLE_EDIT]: '/business/:business_id/article/:id/edit',
  [ROUTE_NAME.LOGIN]: '/login',
  [ROUTE_NAME.SIGNUP]: '/signup',
  [ROUTE_NAME.NOT_FOUND]: '/:pathMatch(.*)*'
} as const
