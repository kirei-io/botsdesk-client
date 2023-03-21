import type { NavigationGuard } from 'vue-router'

export const removeQueryParams: NavigationGuard = (to) => {
  if (Object.keys(to.query).length) {
    return { path: to.path, query: {}, hash: to.hash }
  }
}

export const removeHash: NavigationGuard = (to) => {
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
