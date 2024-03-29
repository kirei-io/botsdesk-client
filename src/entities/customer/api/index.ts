import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { DefaultApiInstance } from '@/shared/api'

import type {
  ArticleInput,
  ArticleParams,
  ArticleTagListParams,
  AskArticlesParams,
  CreateArticleParams,
  CreateResponse,
  CreateTagParams,
  CreateTagResponce,
  FullArticleOutput,
  GetBusinessTokenParams,
  GetBusinessTokenResponse,
  ListArticlesParams,
  ListArticlesResponse,
  ListAskArticlesResponce,
  ListBusinessesParams,
  ListBusinessesResponse,
  ListChannelsParams,
  ListChannelsResponse,
  ListTagsParams,
  ListTagsResponce,
  RemoveTagParams,
  TagParams
} from './interface'

export class CustomerApi {
  private readonly path = {
    /**
     * @path `/business/`
     */
    business: () => '/business/',

    /**
     * @path '/business/:business_id/article
     * @path '/business/:business_id/article/:id
     */
    article: (business_id: string, id?: string) =>
      `/business/${business_id}/article/${id ? id : ''}`,

    /**
     *
     * @path `/business/:business_id/channel/`
     */
    channel: (business_id: string) => `/business/${business_id}/channel/`,

    ask: (business_id: string, id: string) => `/business/${business_id}/article/${id}/ask_article`,

    business_token: (business_id: string) => `/business/${business_id}/token/`,

    tag: (business_id: string) => `/business/${business_id}/tag/`,

    tagArticle: (business_id: string, id: string, tag_id: string) =>
      `/business/${business_id}/article/${id}/tag/${tag_id}`,

    removeTag: (business_id: string, tag_id: string) => `/business/${business_id}/tag/${tag_id}`,

    tagListArtice: (business_id: string, id: string) =>
      `/business/${business_id}/article/${id}/tag/`
  } as const

  constructor(private readonly request: AxiosInstance) {
    this.request.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.removeItem('access_token')
          window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }

  private queryConfig<Q extends Record<string, unknown | unknown[]>>(
    query?: Q
  ): AxiosRequestConfig | undefined {
    if (typeof query === 'object' && typeof query !== null) {
      const param = new URLSearchParams()
      for (const key in query) {
        const queryValue = query[key]

        if (Array.isArray(queryValue)) {
          queryValue.forEach((value) => {
            param.append(key, String(value))
          })
        } else {
          param.append(key, String(queryValue))
        }
      }

      return { params: param }
    }
    return undefined
  }

  public listArticles(params: ListArticlesParams): Promise<AxiosResponse<ListArticlesResponse>> {
    const url = this.path.article(params.path.business_id)
    const config = this.queryConfig(params.query)

    return this.request.get(url, config)
  }

  public article(params: ArticleParams): Promise<AxiosResponse<FullArticleOutput>> {
    const url = this.path.article(params.path.business_id, params.path.id)
    const config = this.queryConfig(params.query)
    return this.request.get(url, config)
  }

  public createArticle(
    params: CreateArticleParams,
    data: ArticleInput
  ): Promise<AxiosResponse<CreateResponse>> {
    const url = this.path.article(params.path.business_id)
    const config = this.queryConfig(params.query)

    return this.request.post(url, data, config)
  }

  public updateArticle(params: ArticleParams, data: ArticleInput): Promise<AxiosResponse<null>> {
    const url = this.path.article(params.path.business_id, params.path.id)
    const config = this.queryConfig(params.query)

    return this.request.patch(url, data, config)
  }

  public removeArticle(params: ArticleParams): Promise<AxiosResponse<null>> {
    const url = this.path.article(params.path.business_id, params.path.id)
    const config = this.queryConfig(params.query)

    return this.request.delete(url, config)
  }

  public listChannels(params: ListChannelsParams): Promise<AxiosResponse<ListChannelsResponse>> {
    const url = this.path.channel(params.path.business_id)
    const config = this.queryConfig(params.query)

    return this.request.get(url, config)
  }

  public listBusinesses(
    params: ListBusinessesParams
  ): Promise<AxiosResponse<ListBusinessesResponse>> {
    const url = this.path.business()
    const config = this.queryConfig(params.query)

    return this.request.get(url, config)
  }

  public askArticle(params: AskArticlesParams): Promise<AxiosResponse<ListAskArticlesResponce>> {
    const url = this.path.ask(params.path.business_id, params.path.id)
    const config = this.queryConfig(params.query)

    return this.request(url, config)
  }

  public getBusinessToken(
    params: GetBusinessTokenParams
  ): Promise<AxiosResponse<GetBusinessTokenResponse>> {
    const url = this.path.business_token(params.path.business_id)
    const config = this.queryConfig(params.query)

    return this.request.get(url, config)
  }

  public listTags(params: ListTagsParams): Promise<AxiosResponse<ListTagsResponce>> {
    const url = this.path.tag(params.path.business_id)

    const config = this.queryConfig(params.query)

    return this.request.get(url, config)
  }

  public assignTag(params: TagParams): Promise<AxiosResponse<null>> {
    const url = this.path.tagArticle(params.path.business_id, params.path.id, params.path.tag_id)
    const config = this.queryConfig(params.query)

    return this.request.post(url, config)
  }

  public revokeTag(params: TagParams): Promise<AxiosResponse<null>> {
    const url = this.path.tagArticle(params.path.business_id, params.path.id, params.path.tag_id)
    const config = this.queryConfig(params.query)

    return this.request.delete(url, config)
  }

  public createTag(
    params: CreateTagParams,
    name: string
  ): Promise<AxiosResponse<CreateTagResponce>> {
    const url = this.path.tag(params.path.business_id)
    const config = this.queryConfig(params.query)

    return this.request.post(url, { name }, config)
  }

  public removeTag(params: RemoveTagParams): Promise<AxiosResponse<null>> {
    const url = this.path.removeTag(params.path.business_id, params.path.tag_id)
    const config = this.queryConfig(params.query)

    return this.request.delete(url, config)
  }

  public artileTagList(params: ArticleTagListParams): Promise<AxiosResponse<ListTagsResponce>> {
    const url = this.path.tagListArtice(params.path.business_id, params.path.id)
    const config = this.queryConfig(params.query)

    return this.request.get(url, config)
  }
}

export const customer = new CustomerApi(DefaultApiInstance)

export type { FullArticleOutput, ListArticlesResponse, ListBusinessesResponse }
