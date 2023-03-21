export interface ListArticlesParams {
  path: BusinessId
  query?: Pagination & UserId
}

export interface ListBusinesses {
  query?: Pagination & UserId
}

type BusinessId = {
  business_id: number
}

type ArtileId = {
  id: number
}

type Pagination = {
  /**
   * @min 0
   */
  skip?: number

  /**
   * @min 10
   * @max 100
   */
  limit?: number
}

type UserId = {
  user_id?: number
}

export interface ListArticlesResponse {
  items: ShortArticleOutput[]
  total: number
}

export interface FullArticleOutput {
  article_id: number
  created_at: string
  updated_at: string
  question_md: string
  answer_md: string
}

export interface CreateArticleParams {
  path: BusinessId
  query?: UserId
}

export interface ArticleParams {
  path: BusinessId & ArtileId
  query?: UserId
}

export type ArticleInput = Pick<FullArticleOutput, 'question_md' | 'answer_md'>
export type ShortArticleOutput = Omit<FullArticleOutput, 'answer_md'>
