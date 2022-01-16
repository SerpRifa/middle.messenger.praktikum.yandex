import mainTmpl from './Main.hbs'
import * as styles from './Main.module.css'
import { data } from './mock'

export const renderMain = () => {
  return mainTmpl({
    data,
    styles,
  })
}
