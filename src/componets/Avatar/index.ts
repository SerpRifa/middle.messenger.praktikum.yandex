import no_avatar from '../../../static/img/no_avatar.jpg'
import avatarTmpl from './Avatar.hbs'
import * as styles from './Avatar.module.css'
import classnames from '../../utils/classnames'
import { BaseBlock } from '../../utils/base-block'

export interface AvatarProps {
  avatar: any;
  className: string;
}

export class Avatar extends BaseBlock<AvatarProps> {
  render() {
    const className = classnames(styles.avatar, this.props?.className)
    return this.compile(avatarTmpl, { avatar: no_avatar, ...this.props, className})
  }
}
