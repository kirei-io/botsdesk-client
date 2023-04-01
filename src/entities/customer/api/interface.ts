type ListType<T> = {
  items: T[]
  total: number
}

type BusinessId = {
  business_id: string
}

type ArticleId = {
  id: string
}

type TagId = {
  tag_id: string
}

type Pagination = {
  /**
   * @min 0
   */
  skip?: string

  /**
   * @min 10
   * @max 100
   */
  limit?: string
}

type UserId = {
  user_id?: string
}

export type ArticleInput = {
  question_md: string
  answer_md: string
}

export interface ArticleParams {
  path: BusinessId & ArticleId
  query?: UserId
}

export interface ListChannelsParams {
  path: BusinessId
  query?: Pagination & UserId
}

export interface ListArticlesParams {
  path: BusinessId
  query?: Pagination &
    UserId & {
      only?: 'all' | 'answered' | 'unanswered'
      with_tag?: string[]
    }
}

export interface ListTagsParams {
  path: BusinessId
  query?: Pagination & UserId
}

export interface TagItem {
  tag_id: number
  name: string
  created_at: string
}

export interface CreateArticleParams {
  path: BusinessId
  query?: UserId
}

export interface ListBusinessesParams {
  query?: Pagination & UserId
}

export interface AskArticlesParams {
  path: BusinessId & ArticleId
  query?: UserId & Pagination
}

export interface CustomerErrorResponse {
  detail: string | unknown[]
}

export type FullArticleOutput = {
  article_id: number
  created_at: string
  updated_at: string
  question: string
  question_md: string
  answer: string
  answer_md: string
}

export type ShortArticleOutput = Omit<FullArticleOutput, 'answer' | 'answer_md'>

export type BusinessInfoOutput = {
  name: string
  language: string
  business_id: number
  created_at: string
}

export type ListChannelsItem = {
  channel_id: number
  kind: string
  internal_id: string
  speaking_name: string
  created_at: string
}

export type CreateResponse = {
  object_id: number
}

export type ListAskArticlesItems = {
  ask_article_id: number
  channel: ListChannelsItem
  author: string
  author_link: string
  created_at: string
}

export interface GetBusinessTokenParams {
  path: BusinessId
  query?: UserId
}

export interface GetBusinessTokenResponse {
  access_token: string
}

export interface TagParams {
  path: BusinessId & ArticleId & TagId
  query?: UserId
}

export interface CreateTagParams {
  path: BusinessId
  query?: UserId
}

export interface RemoveTagParams {
  path: BusinessId & TagId
  query?: UserId
}

export interface CreateTagResponce {
  object_id: number
}

export type ListArticlesResponse = ListType<ShortArticleOutput>
export type ListBusinessesResponse = ListType<BusinessInfoOutput>
export type ListChannelsResponse = ListType<ListChannelsItem>
export type ListAskArticlesResponce = ListType<ListAskArticlesItems>
export type ListTagsResponce = ListType<TagItem>
