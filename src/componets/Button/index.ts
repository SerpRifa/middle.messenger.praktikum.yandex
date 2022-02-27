import buttonTmpl from './Button.hbs';
import * as styles from './Button.module.css';
import classnames from '../../utils/classnames'

export const Button = (props) => {
  const className = classnames(styles.button, props.className)
  return buttonTmpl({title: '', ...props, className})
}
