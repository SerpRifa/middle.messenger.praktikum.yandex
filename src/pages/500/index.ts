import page500Tmpl from "./500.hbs";
import * as styles from "./500.module.css";
import { BaseComponetProps } from "../../types/types";
import { BaseBlock } from "../../utils/base-block";
import { withRouter } from "../../utils/router";

export interface Page500Props extends BaseComponetProps {
  styles: any;
}

export class Page500 extends BaseBlock<Page500Props> {
  render() {
    return this.compile(page500Tmpl, this.props);
  }
}

export const propsPage500: Page500Props = { styles };

export default withRouter(Page500);
