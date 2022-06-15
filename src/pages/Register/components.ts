import * as styles from '../Login/Login.module.css';
import {
  TextField, EmailField, PasswordField, Button, Input,
} from '../../componets';
import {
  emailValidator, loginValidator, nameValidator, passwordValidator, phoneValidator,
} from '../../utils/validators';

export const firstName = new Input(
  {
    placeholder: 'First Name',
    name: 'first_name',
    className: styles['text-field'],
  },
  [nameValidator],
);

export const secondName = new TextField(
  {
    placeholder: 'Second Name',
    name: 'second_name',
    className: styles['text-field'],
  },
  [nameValidator],
);

export const login = new TextField(
  {
    placeholder: 'Create User name',
    name: 'login',
    className: styles['text-field'],
  },
  [loginValidator],
);

export const email = new EmailField({
  placeholder: 'Enter Emai',
  name: 'email',
  className: styles['text-field'],
}, [emailValidator]);

export const password = new PasswordField({
  placeholder: 'Password',
  name: 'password',
  className: styles['text-field'],
}, [passwordValidator]);

export const phone = new PasswordField({
  placeholder: 'Phone',
  name: 'phone',
  className: styles['text-field'],
}, [phoneValidator]);

export const button = new Button({ title: 'Register' });
