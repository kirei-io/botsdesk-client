export type FullArticleOutput = {
  articleId: number
  created_at: string
  updated_at: string
  question: string
  answer: string
}

export type ShortArticleOutput = Omit<FullArticleOutput, 'answer'>

export type ListArticles = {
  items: ShortArticleOutput[]
  total: number
}
