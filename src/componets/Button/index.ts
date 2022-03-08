import buttonTmpl from './Button.hbs'
import * as styles from './Button.module.css'
import classnames from '../../utils/classnames'
import {BaseBlock} from '../../utils/base-block'

export interface ButtonProps {
  className?: string
  title?: string
}

export class Button extends BaseBlock<ButtonProps> {
  render() {
    const className = classnames(styles.button, this.props?.className)
    return this.compile(buttonTmpl, { title: '', ...this.props, className})
  }
}
