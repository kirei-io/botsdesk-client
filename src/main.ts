import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import {
  faTrash,
  faPen,
  faArrowUpRightFromSquare,
  faPlus,
  faAngleLeft,
  faAngleRight,
  faHouse,
  faSlash,
  faBriefcase,
  faArrowLeftLong,
  faSave,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faTrash,
  faPen,
  faArrowUpRightFromSquare,
  faPlus,
  faAngleLeft,
  faAngleRight,
  faHouse,
  faSlash,
  faBriefcase,
  faArrowLeftLong,
  faSave,
  faRightFromBracket
)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
