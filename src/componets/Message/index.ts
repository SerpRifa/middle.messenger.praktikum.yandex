import messageTmpl from './Message.hbs';
import * as styles from './Message.module.css';
import classnames from '../../utils/classnames';
import { BaseComponetProps } from '../../types/types';
import { BaseBlock } from '../../utils/base-block';
import { Avatar } from '../Avatar';

export interface MessageProps extends BaseComponetProps {
  avatar: any
  firstName: string
  lastName: string
  content: string
  title?: string
  styles?: any
}

export class Message extends BaseBlock<MessageProps> {
  render() {
    const className = classnames(styles.conteiner, this.props?.className);
    const components = {
      avatar: new Avatar({ avatar: this.props.avatar }),
    };
    return this.compile(messageTmpl, {
      title: '', ...this.props, components, styles, className,
    });
  }
}
