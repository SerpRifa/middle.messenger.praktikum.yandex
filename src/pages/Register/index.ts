import registerTmpl from './Register.hbs'
import * as styles from '../Login/Login.module.css'

export const renderRegister = () => {
  return registerTmpl({ styles })
}
