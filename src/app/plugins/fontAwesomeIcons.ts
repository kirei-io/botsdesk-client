import { library } from '@fortawesome/fontawesome-svg-core'
import {
  fa1,
  fa2,
  faAngleLeft,
  faAngleRight,
  faArrowLeftLong,
  faArrowTurnRight,
  faArrowUpRightFromSquare,
  faBold,
  faBriefcase,
  faCode,
  faHeading,
  faHouse,
  faItalic,
  faListOl,
  faListUl,
  faMinus,
  faMoon,
  faPen,
  faPlus,
  faQuoteRight,
  faRightFromBracket,
  faRotateLeft,
  faSave,
  faSlash,
  faSpinner,
  faSun,
  faTentArrowTurnLeft,
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
    faSun,
    faArrowTurnRight,
    faTentArrowTurnLeft,
    faBold,
    faItalic,
    faCode,
    faHeading,
    faListOl,
    faListUl,
    fa1,
    fa2,
    faQuoteRight,
    faMinus
  )
}
