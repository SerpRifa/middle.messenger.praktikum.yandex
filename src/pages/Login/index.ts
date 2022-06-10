import loginTmpl from './Login.hbs';
import * as styles from './Login.module.css';
import { BaseBlock } from '../../utils/base-block';
import { EmailField, PasswordField, Button } from '../../componets';
import { BaseComponetProps } from '../../types/types';
import { emailValidator, passwordValidator } from '../../utils/validators';
import {Router, withRouter} from '../../utils/router';
import {Fetch} from "../../utils/fetch";
import {getServerUrl} from "../../utils/url";

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


export const loginProps = {
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

        console.log(data)

        const fetch = new Fetch();
        fetch
          .post<any>('/auth/signin', {data})
          .then((response) => {
            console.log('response', response)
            const router = new Router();
            router.go('/main')
          })
          .catch((e) => console.error(e))
      },
    },
  };
  // @ts-ignore
  export default (withRouter(Login));


