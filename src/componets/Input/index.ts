import inputTmpl from './Input.hbs'
import * as styles from './Input.module.css'
import classnames from '../../utils/classnames'
import {BaseBlock} from '../../utils/base-block'
import {BaseComponetProps} from '../../types/types'

export interface InputProps extends BaseComponetProps {
  placeholder?: string;
  value?: string;
  type?: string;
  className?: string;
}

export class Input extends BaseBlock<InputProps> {
  render() {
    const className = classnames(styles.input, this.props?.className)
    return this.compile(inputTmpl, { placeholder: '', value: '', type: 'text', ...this.props, className})
  }
}

export class TextField extends BaseBlock<InputProps> {
  render() {
    const className = classnames(styles.input, this.props?.className)
    return this.compile(inputTmpl, { placeholder: '', value: '', ...this.props, type: 'text', className})
  }
}

export class PasswordField extends BaseBlock<InputProps> {
  render() {
    const className = classnames(styles.input, this.props?.className)
    return this.compile(inputTmpl, { placeholder: '', value: '', ...this.props, type: 'password', className})
  }
}

export class EmailField extends BaseBlock<InputProps> {
  render() {
    const className = classnames(styles.input, this.props?.className)
    return this.compile(inputTmpl, { placeholder: '', value: '', ...this.props, type: 'text', className})
  }
}


