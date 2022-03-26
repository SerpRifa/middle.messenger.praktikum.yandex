import profileTmpl from './Profile.hbs';
import * as styles from './Profile.module.css';
import { BaseBlock } from '../../utils/base-block';
import { BaseComponetProps } from '../../types/types';
import { render } from '../../utils/render';
import {
  Avatar, Button, EmailField, Input, PasswordField, TextField,
} from '../../componets';
import {
  emailValidator, loginValidator, nameValidator, passwordValidator, phoneValidator,
} from '../../utils/validators';

export interface ProfileProps extends BaseComponetProps {
  styles: any
}

const avatar = new Avatar({
  name: 'avatar',
  title: 'Изменить аватар',
});

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

const displayName = new TextField({
  placeholder: 'Display name',
  name: 'display_name',
  className: styles['text-field'],
});

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

const oldPassword = new PasswordField({
  placeholder: 'Password',
  name: 'oldPassword',
  className: styles['text-field'],
}, [passwordValidator]);

const newPassword = new PasswordField({
  placeholder: 'New Password',
  name: 'newPassword',
  className: styles['text-field'],
}, [passwordValidator]);

const phone = new TextField({
  placeholder: 'Phone',
  name: 'phone',
  className: styles['text-field'],
}, [phoneValidator]);

const save = new Button({ title: 'Save' });
const cancel = new Button({ title: 'Cancel' });

export class Profile extends BaseBlock<ProfileProps> {
  render() {
    return this.compile(profileTmpl, this.props);
  }
}

export const renderProfile = (selector: string) => {
  const profile = new Profile({
    components: {
      avatar,
      firstName,
      secondName,
      displayName,
      login,
      email,
      oldPassword,
      newPassword,
      phone,
      save,
      cancel,
    },
    styles,
    events: {
      submit: (e) => {
        e.preventDefault();
        firstName.validateInput();
        secondName.validateInput();
        login.validateInput();
        email.validateInput();
        oldPassword.validateInput();
        newPassword.validateInput();
        phone.validateInput();

        const data: Record<string, string> = {};

        const inputFields = document.querySelectorAll('input');

        inputFields.forEach((input: HTMLInputElement) => {
          data[input.name] = input.value;
        });

        console.log(data)
      },
    },
  });
  render(selector, profile);
};
