import inputTmpl from './Input.hbs'
import * as styles from './Input.module.css'
import classnames from '../../utils/classnames'

export const Input = (props) => {
  const className = classnames(styles.input, props.className)
  return inputTmpl({ placeholder: '', value: '', type: 'text', ...props, className})
}

export const TextField = (props) => Input({...props, type: 'text'})

export const PasswordField = (props) => Input({ ...props, type: 'password'})

export const EmailField = (props) => Input({ ...props, type: 'text'})
