import { ROUTE_NAME } from './routeName'

export const ROUTE_PATH = {
  [ROUTE_NAME.HOME]: '/',
  [ROUTE_NAME.ARTICLE_LIST]: '/business/:business_id(\\d+)/article',
  [ROUTE_NAME.ARTICLE_CREATE]: '/business/:business_id(\\d+)/article/create',
  [ROUTE_NAME.ARTICLE_VIEW]: '/business/:business_id(\\d+)/article/:id(\\d+)',
  [ROUTE_NAME.ARTICLE_EDIT]: '/business/:business_id(\\d+)/article/:id(\\d+)/edit',
  [ROUTE_NAME.LOGIN]: '/login/',
  [ROUTE_NAME.SIGNUP]: '/signup',
  [ROUTE_NAME.NOT_FOUND]: '/:pathMatch(.*)*'
} as const
