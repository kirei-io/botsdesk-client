import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeftLong,
  faArrowUpRightFromSquare,
  faBriefcase,
  faHouse,
  faMoon,
  faPen,
  faPlus,
  faRightFromBracket,
  faRotateLeft,
  faSave,
  faSlash,
  faSpinner,
  faSun,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

export const createFontAwesomeIcons = () => {
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
    faRightFromBracket,
    faRotateLeft,
    faSpinner,
    faMoon,
    faSun
  )
}
