import noAvatar from "../../../static/img/no_avatar.jpg";
import avatarTmpl from "./Avatar.hbs";
import * as styles from "./Avatar.module.css";
import classnames from "../../utils/classnames";
import { BaseBlock } from "../../utils/base-block";
import { BaseComponetProps } from "../../types/types";
import { fetch } from "../../utils/fetch";

export interface AvatarProps extends BaseComponetProps {
  avatar?: string | null;
  title?: string;
  className?: string;
}

export class Avatar extends BaseBlock<AvatarProps> {
  render() {
    const className = classnames(styles.avatar, this.props?.className);
    const avatar = this.props.avatar ? fetch.resourceUrl + this.props.avatar : noAvatar;
    return this.compile(avatarTmpl, { ...this.props, className, avatar });
  }
}
