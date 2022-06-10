import inputTmpl from "./ChangeAvatar.hbs";
import * as styles from "./ChangeAvatar.module.css";
import classnames from "../../utils/classnames";
import { BaseBlock } from "../../utils/base-block";
import { BaseComponetProps } from "../../types/types";

export class ChangeAvatar extends BaseBlock<BaseComponetProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const className = classnames(styles.input, this.props?.className);
    return this.compile(inputTmpl, { className });
  }

  componentAfterRender() {}
}
