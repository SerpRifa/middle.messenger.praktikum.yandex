import contactTmpl from './Contact.hbs'
import * as styles from './Contact.module.css'
import classnames from '../../utils/classnames'

export const Contact = (props) => {
  const className = classnames(styles.contact, props.className)
  return contactTmpl({
    title: '',
    styles,
    ...props,
    className
  })
}
