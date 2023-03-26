import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  type ThemeType = 'ctp-latte' | 'ctp-frappe'
  let t: ThemeType | null = localStorage.getItem('theme') as ThemeType | null

  if (!t) {
    localStorage.setItem('theme', 'ctp-latte')
    t = 'ctp-latte'
  }

  const theme = ref<ThemeType>(t)

  function onSwtich() {
    theme.value = theme.value === 'ctp-latte' ? 'ctp-frappe' : 'ctp-latte'
    localStorage.setItem('theme', theme.value)
  }
  return { theme, onSwtich }
})
