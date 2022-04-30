import mainTmpl from './Main.hbs';
import * as styles from './Main.module.css';
import { data, IResponse } from './mock';
import { BaseBlock } from '../../utils/base-block';
import { BaseComponetProps } from '../../types/types';
import { Contact, Message, TextField } from '../../componets';
import { render } from '../../utils/render';

export interface MainProps extends BaseComponetProps {
  data: IResponse
  styles: any
}

const search = new TextField({
  placeholder: 'Search...',
  name: 'search',
  className: styles['search-input'],
});

const message = new TextField({
  placeholder: 'Type text...',
  name: 'message',
});

export class Main extends BaseBlock<MainProps> {
  render() {
    const messages = data.messages.map((message) => new Message({ ...message }));
    const contacts = data.contacts.map((contact) => new Contact({ ...contact }));
    const components = {
      ...this.props.components,
      messages,
      contacts,
    };
    return this.compile(mainTmpl, { ...this.props, components });
  }
}

export const renderMain = (selector: string) => {
  const main = new Main({
    components: {
      search,
      message,
    },
    data,
    styles,
  });

  render(selector, main);
};
