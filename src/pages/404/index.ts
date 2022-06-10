import page404Tmpl from './404.hbs';
import * as styles from './404.module.css';
import { BaseComponetProps } from '../../types/types';
import { BaseBlock } from '../../utils/base-block';
import {withRouter} from "../../utils/router";

export interface Page404Props extends BaseComponetProps {
  styles: any
}

export class Page404 extends BaseBlock<Page404Props> {
  render() {
    return this.compile(page404Tmpl, this.props);
  }
}

export const propsPage404 = { styles };

// @ts-ignore
export default (withRouter(Page404));
