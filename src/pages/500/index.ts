import page500Tmpl from './500.hbs';
import * as styles from './500.module.css';
import { BaseComponetProps } from '../../types/types';
import { BaseBlock } from '../../utils/base-block';
import { render } from '../../utils/render';

export interface Page500Props extends BaseComponetProps {
  styles: any
}

export class Page500 extends BaseBlock<Page500Props> {
  render() {
    return this.compile(page500Tmpl, this.props);
  }
}

export const render500 = (selector: string) => {
  const page500 = new Page500({ styles });
  render(selector, page500);
};
