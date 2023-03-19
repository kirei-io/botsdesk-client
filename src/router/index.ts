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
import { createRouter, createWebHistory } from 'vue-router'

const removeQueryParams = (to: any) => {
  if (Object.keys(to.query).length) {
    return { path: to.path, query: {}, hash: to.hash }
  }
}

const removeHash = (to: any) => {
  if (to.hash) {
    return { path: to.path, query: to.query, hash: '' }
  }
}

// const businessExists = (to: any, from: any, next: any) => {
//   const buisnesses = ['first', 'second']
//   if (buisnesses.find((business_id) => business_id === to.params.business_id)) {
//     next()
//   } else {
//     next({ name: 'notfound' })
//   }
// }

// const articleExists = (to: any, from: any, next: any) => {
//   const articles = ['one', 'two']
//   if (articles.find((id) => id === to.params.id)) {
//     next()
//   } else {
//     next({ name: 'notfound' })
//   }
// }

const authenticatedProtected = (to: any, from: any, next: any) => {
  const isAuth = true
  if (isAuth) {
    next()
  } else {
    next({ name: 'login' })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      beforeEnter: [authenticatedProtected],
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            title: 'Home'
          },
          component: HomeView
        },
        {
          path: '/business',
          name: 'business.list',
          meta: {
            title: 'Businesses List'
          },
          component: BusinessesList,
          beforeEnter: [removeQueryParams, removeHash]
        },
        {
          path: '/business/:business_id/article',
          name: 'article.list',
          component: ArticlesList,
          beforeEnter: [removeQueryParams, removeHash]
        },
        {
          path: '/business/:business_id/article/create',
          name: 'article.create',
          meta: {
            title: 'Create a new article'
          },
          component: ArticleCreate
        },
        {
          path: '/business/:business_id/article/:id',
          name: 'article',
          component: ArticleView,
          beforeEnter: [removeQueryParams, removeHash]
        },
        {
          path: '/business/:business_id/article/:id/edit',
          name: 'article.edit',
          meta: {
            title: 'Edit article'
          },
          component: ArticleEdit
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    }
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
