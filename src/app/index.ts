import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { createFontAwesomeIcons, router } from './plugins'

createFontAwesomeIcons()
export const app = createApp(App)

app.use(createPinia()).use(router)
