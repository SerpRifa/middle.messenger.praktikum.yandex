import no_avatar from '../../../static/img/no_avatar.jpg'
import avatarTmpl from './Avatar.hbs'
import * as styles from './Avatar.module.css'
import classnames from '../../utils/classnames'

export const Avatar = (props) => {
  const className = classnames(styles.avatar, props.className)
  return  avatarTmpl({ avatar: no_avatar, ...props, className})
}
