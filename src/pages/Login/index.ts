import loginTmpl from './Login.hbs';
import * as styles from './Login.module.css';
import { BaseBlock } from '../../utils/base-block';
import { EmailField, PasswordField, Button } from '../../componets';
import { BaseComponetProps } from '../../types/types';
import { render } from '../../utils/render';
import { emailValidator, passwordValidator } from '../../utils/validators';

export interface LoginProps extends BaseComponetProps {
  styles: any
}

const emailField = new EmailField({
  placeholder: 'Enter email or user name',
  name: 'login',
}, [emailValidator]);

const passwordField = new PasswordField({
  placeholder: 'Password',
  name: 'password',
  className: styles['text-field'],
}, [passwordValidator]);

const button = new Button({ title: 'Sign in' });

export class Login extends BaseBlock<LoginProps> {
  render() {
    return this.compile(loginTmpl, this.props);
  }
}

export const renderLogin = (selector: string) => {
  const login = new Login({
    components: {
      EmailField: emailField,
      PasswordField: passwordField,
      Button: button,
    },
    styles,
    events: {
      submit: (e) => {
        e.preventDefault();
        emailField.validateInput();
        passwordField.validateInput();
        const data: Record<string, string> = {};

        const inputFields = document.querySelectorAll('input');

        inputFields.forEach((input: HTMLInputElement) => {
          data[input.name] = input.value;
        });
      },
    },
  });
  render(selector, login);
};
