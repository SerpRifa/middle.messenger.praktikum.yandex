import introTmpl from './Intro.hbs';
import * as styles from './Intro.module.css';
import { BaseBlock } from '../../utils/base-block';
import { BaseComponetProps } from '../../types/types';
import { render } from '../../utils/render';

export interface IntroProps extends BaseComponetProps {
  styles: any
}

export class Intro extends BaseBlock<IntroProps> {
  render() {
    return this.compile(introTmpl, this.props);
  }
}

export const renderIntro = (selector: string) => {
  const intro = new Intro({ styles });
  render(selector, intro);
};
