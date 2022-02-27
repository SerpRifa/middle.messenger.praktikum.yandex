import loginTmpl from './Login.hbs'
import * as styles from './Login.module.css'

export const renderLogin = () => {
  return loginTmpl({ styles })
}
