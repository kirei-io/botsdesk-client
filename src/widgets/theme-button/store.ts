import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  type ThemeType = 'latte' | 'frappe'
  let t: ThemeType | null = localStorage.getItem('theme') as ThemeType | null

  if (!t) {
    localStorage.setItem('theme', 'latte')
    t = 'latte'
  }

  const theme = ref<ThemeType>(t)

  function onSwtich() {
    theme.value = theme.value === 'latte' ? 'frappe' : 'latte'
  }
  return { theme, onSwtich }
})
