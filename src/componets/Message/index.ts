import messageTmpl from './Message.hbs'
import * as styles from './Message.module.css'
import classnames from '../../utils/classnames'
import { BaseComponetProps } from '../../types/types'
import { BaseBlock } from '../../utils/base-block'

export interface MessageProps extends BaseComponetProps {
  avatar: any
  firstName: string
  lastName: string
  message: string
  title?: string
  styles?: any
}

export class Message extends BaseBlock<MessageProps> {
  render() {
    const className = classnames(styles.conteiner, this.props?.className)
    console.log('props', this.props)
    return this.compile(messageTmpl, { title: '', ...this.props, styles, className} )
  }
}

