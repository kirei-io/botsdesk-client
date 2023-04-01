import { defineStore } from 'pinia'
import { ref } from 'vue'

import { customer, type ListArticlesResponse } from '../api'
import { push } from '@/entities/push/api'

export const useArticleStore = defineStore('article', () => {
  const answer = ref<string | null>(null)
  const answer_md = ref<string | null>(null)
  const question = ref<string | null>(null)
  const question_md = ref<string | null>(null)
  const articleId = ref<string | null>(null)
  const created = ref<string | null>(null)
  const updated = ref<string | null>(null)

  const askArticles = ref<
    {
      ask_article_id: number
      channel: Record<string, string | number>
      author: string
      author_link: string
      created_at: string
    }[]
  >([])

  const newAnswer = ref<string>('')
  const newQuestion = ref<string>('')

  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  async function onArticle(business_id: string, id: string) {
    try {
      isLoading.value = true
      const res = await customer.article({ path: { business_id, id } })
      isLoading.value = false

      answer.value = res.data.answer
      answer_md.value = res.data.answer_md
      question.value = res.data.question
      question_md.value = res.data.question_md
      articleId.value = String(res.data.article_id)
      created.value = new Date(res.data.created_at).toLocaleString()
      updated.value = new Date(res.data.updated_at).toLocaleString()

      newAnswer.value = answer_md.value
      newQuestion.value = question_md.value
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  async function onCreateArticle(business_id: string) {
    try {
      if (!newQuestion.value) {
        throw new Error('new question is empty')
      }
      if (!newAnswer.value) {
        throw new Error('new answer is empty')
      }

      const question_md = newQuestion.value
      const answer_md = newAnswer.value
      await customer.createArticle(
        {
          path: {
            business_id
          }
        },
        {
          question_md,
          answer_md
        }
      )
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  async function onEditArticle(business_id: string, id: string) {
    try {
      if (newQuestion.value === question.value && newAnswer.value === answer.value) {
        throw new Error(`Old value is equal to new value`)
      }

      const question_md = newQuestion.value
      const answer_md = newAnswer.value

      await customer.updateArticle(
        {
          path: {
            business_id,
            id
          }
        },
        {
          question_md,
          answer_md
        }
      )

      if (answer.value === '') {
        const res = await customer.getBusinessToken(
          {
            path: {
              business_id
            }
          }
        )
        localStorage.setItem('business_access_token', res.data.access_token)
        await push.send(
          {
            id,
            "We have answer for you",
            "Click on this notification for read answer for you"
          }
        )
      }
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  async function onDeleteAtrticle(business_id: string, id: string) {
    try {
      isLoading.value = true

      await customer.removeArticle({
        path: {
          business_id,
          id
        }
      })

      isLoading.value = false
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  async function onAskArticle(business_id: string, id: string) {
    try {
      isLoading.value = true

      const res = await customer.askArticle({
        path: { business_id, id },
        query: { skip: '0', limit: '25' }
      })

      askArticles.value = res.data.items

      isLoading.value = false
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  function onNewValuesReset() {
    newAnswer.value = answer.value ?? ''
    newQuestion.value = question.value ?? ''
    error.value = null
  }

  function onErrorReset() {
    error.value = null
  }

  function $reset() {
    answer.value = null
    answer_md.value = null
    question.value = null
    question_md.value = null
    articleId.value = null
    created.value = null
    updated.value = null
    askArticles.value = []
    error.value = null

    newAnswer.value = ''
    newQuestion.value = ''
  }

  return {
    answer,
    answer_md,
    question,
    question_md,
    articleId,
    created,
    updated,
    newAnswer,
    newQuestion,
    isLoading,
    askArticles,
    error,
    onArticle,
    onCreateArticle,
    onEditArticle,
    onDeleteAtrticle,
    onNewValuesReset,
    onErrorReset,
    onAskArticle,
    $reset
  }
})

export const useBusinessStore = defineStore('business', () => {
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const businessMap = ref<Map<string, { name: string; language: string }>>(new Map())
  const currentBusinessName = ref<string | null>(null)
  async function onListBusinesses() {
    try {
      isLoading.value = true
      const res = await customer.listBusinesses({ query: { skip: '0', limit: '25' } })
      isLoading.value = false

      for (const business of res.data.items) {
        businessMap.value?.set(String(business.business_id), {
          name: business.name,
          language: business.language
        })
      }
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    error.value = null
    currentBusinessName.value = null
    businessMap.value = new Map()
  }

  return {
    businessMap,
    currentBusinessName,
    isLoading,
    error,
    onListBusinesses,
    $reset
  }
})

export const useArticlesListStore = defineStore('articles-list', () => {
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const articlesList = ref<ListArticlesResponse['items'] | []>([])
  const totalArticles = ref<number | null>(null)

  async function onArticlesList(business_id: string, skip = 0, limit = 10) {
    try {
      isLoading.value = true
      const res = await customer.listArticles({
        path: {
          business_id
        },
        query: {
          skip: String(skip),
          limit: String(limit)
        }
      })
      isLoading.value = false

      totalArticles.value = res.data.total
      articlesList.value = res.data.items
    } catch (err: any) {
      const message = err.response?.data?.detail
      if (err instanceof Error) {
        if (message) {
          error.value = { message, name: 'ERROR_AXIOS' }
        } else {
          error.value = err
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    error.value = null
    articlesList.value = []
    totalArticles.value = null
  }

  return {
    articlesList,
    totalArticles,
    isLoading,
    error,
    onArticlesList,
    $reset
  }
})
