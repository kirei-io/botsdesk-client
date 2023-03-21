import { DefaultApiInstance } from '..'
import type {
  ArticleInput,
  ArticleParams,
  CreateArticleParams,
  ListArticlesParams,
  ListBusinesses
} from './CustomerAPI.interface'

export class CustomerAPI {
  private static PATH = {
    business: () => '/business/',
    article: (business_id: number) => `/business/${business_id}/article/`,
    channel: (business_id: number) => `/business/${business_id}/channel/`
  } as const

  public static listArticles(params: ListArticlesParams) {
    const url = CustomerAPI.PATH.article(params.path.business_id)
    return DefaultApiInstance.get(url, {
      params: params.query
    })
  }

  public static createArticle(params: CreateArticleParams, data: ArticleInput) {
    const url = CustomerAPI.PATH.article(params.path.business_id)
    return DefaultApiInstance.post(url, data, { params: params.query })
  }

  public static article(params: ArticleParams) {
    const url = `${CustomerAPI.PATH.article(params.path.business_id)}/${params.path.id}/`
    return DefaultApiInstance.get(url, { params: params.query })
  }

  public static removeArticle(params: ArticleParams) {
    const url = `${CustomerAPI.PATH.article(params.path.business_id)}/${params.path.id}/`
    return DefaultApiInstance.delete(url, { params: params.query })
  }
  public static updateArticle(params: ArticleParams, data: ArticleInput) {
    const url = `${CustomerAPI.PATH.article(params.path.business_id)}/${params.path.id}/`
    return DefaultApiInstance.patch(url, data, { params: params.query })
  }
  public static listChannels(params: ListArticlesParams) {
    const url = CustomerAPI.PATH.channel(params.path.business_id)
    return DefaultApiInstance.get(url, { params: params.query })
  }
  public static listBusinesses(params: ListBusinesses) {
    const url = CustomerAPI.PATH.business()
    return DefaultApiInstance.get(url, { params: params.query })
  }

  // public static createBusiness() {}
  // public static removeBusiness() {}
}
