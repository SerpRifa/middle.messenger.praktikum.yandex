import profileTmpl from './Profile.hbs'
import * as styles from './Profile.module.css'

export const renderProfile = () => {
  return profileTmpl({ styles })
}
