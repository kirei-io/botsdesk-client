import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './plugins/fontawesome'

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.mount('#app')
