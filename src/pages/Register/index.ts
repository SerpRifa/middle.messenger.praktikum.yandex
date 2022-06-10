import registerTmpl from './Register.hbs';
import * as styles from '../Login/Login.module.css';
import { BaseComponetProps } from '../../types/types';
import { BaseBlock } from '../../utils/base-block';
import {
  TextField, EmailField, PasswordField, Button, Input,
} from '../../componets';
import {
  emailValidator, loginValidator, nameValidator, passwordValidator, phoneValidator,
} from '../../utils/validators';
import {
  getServerUrl
} from '../../utils/url';
import {Router, withRouter} from "../../utils/router";
import { Fetch } from '../../utils/fetch';

export interface RegisterProps extends BaseComponetProps {
  styles: any
}

const firstName = new Input(
  {
    placeholder: 'First Name',
    name: 'first_name',
    className: styles['text-field'],
  },
  [nameValidator],
);

const secondName = new TextField(
  {
    placeholder: 'Second Name',
    name: 'second_name',
    className: styles['text-field'],
  },
  [nameValidator],
);

const login = new TextField(
  {
    placeholder: 'Create User name',
    name: 'login',
    className: styles['text-field'],
  },
  [loginValidator],
);

const email = new EmailField({
  placeholder: 'Enter Emai',
  name: 'email',
  className: styles['text-field'],
}, [emailValidator]);

const password = new PasswordField({
  placeholder: 'Password',
  name: 'password',
  className: styles['text-field'],
}, [passwordValidator]);

const phone = new PasswordField({
  placeholder: 'Phone',
  name: 'phone',
  className: styles['text-field'],
}, [phoneValidator]);

const button = new Button({ title: 'Register' });

export class Register extends BaseBlock<RegisterProps> {
  render() {
    return this.compile(registerTmpl, this.props);
  }
}

export const registerProp: RegisterProps = {
    components: {
      firstName,
      secondName,
      login,
      email,
      password,
      phone,
      button,
    },
    styles,
    events: {
      submit: (e) => {
        e.preventDefault();
        firstName.validateInput();
        secondName.validateInput();
        login.validateInput();
        email.validateInput();
        password.validateInput();
        phone.validateInput();

        const data: Record<string, string> = {};

        const inputFields = document.querySelectorAll('input');

        inputFields.forEach((input: HTMLInputElement) => {
          data[input.name] = input.value;
        });

        console.log(data)

        const fetch = new Fetch();
        const url = getServerUrl('/auth/signup');
        fetch
          .post<any>(url, {data})
          .then((response) => {
            console.log(response);
            const router = new Router();
            router.go('/main')
          })
          .catch((e) => console.error(e))

      },
    },
  }
// @ts-ignore
export default (withRouter(Register));
