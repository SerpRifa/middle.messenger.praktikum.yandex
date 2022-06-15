import contactTmpl from './Contact.hbs';
import * as styles from './Contact.module.css';
import classnames from '../../utils/classnames';
import { BaseBlock } from '../../utils/base-block';
import { BaseComponetProps } from '../../types/types';
import { Avatar } from '../Avatar';

export interface ContactProps extends BaseComponetProps {
  firstName: string
  lastName: string
  className?: string
  message: string
  unreadMessages: number
  id: number
  avatar?: string
  styles?: any
}

export class Contact extends BaseBlock<ContactProps> {
  render() {
    const className = classnames(styles.contact, this.props?.className);
    const components = {
      avatar: new Avatar({ avatar: this.props.avatar }),
    };
    return this.compile(contactTmpl, {
      ...this.props, className, components, styles,
    });
  }

  componentAfterRender() {
    console.log(this.element)
  }
}
