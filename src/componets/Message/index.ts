import messageTmpl from './Message.hbs'
import * as styles from './Message.module.css'
import classnames from '../../utils/classnames'

export const Message = function(props) {
  const className = classnames(styles.conteiner, props.className)
  return messageTmpl({
    title: '',
    styles,
    ...props,
    className
  })
}
