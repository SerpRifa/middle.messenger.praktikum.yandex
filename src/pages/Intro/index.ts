import introTmpl from './Intro.hbs'
import * as styles from './Intro.module.css'

export const renderIntro = () => {
  return introTmpl({ styles })
}
