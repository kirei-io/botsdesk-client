type ListType<T> = {
  items: T[]
  total: number
}

type BusinessId = {
  business_id: string
}

type ArtileId = {
  id: string
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
  path: BusinessId & ArtileId
  query?: UserId
}

export interface ListArticlesParams {
  path: BusinessId
  query?: Pagination & UserId
}

export interface CreateArticleParams {
  path: BusinessId
  query?: UserId
}

export interface ListBusinessesParams {
  query?: Pagination & UserId
}

export interface AskArticlesParams {
  path: BusinessId & ArtileId
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

export type ListArticlesResponse = ListType<ShortArticleOutput>
export type ListBusinessesResponse = ListType<BusinessInfoOutput>
export type ListChannelsResponse = ListType<ListChannelsItem>
export type ListAskArticlesResponce = ListType<ListAskArticlesItems>
