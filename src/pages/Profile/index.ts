import profileTmpl from './Profile.hbs'
import * as styles from './Profile.module.css'
import { BaseBlock } from '../../utils/base-block'
import { BaseComponetProps } from '../../types/types'
import {render} from '../../utils/render'
import {Avatar, Button, EmailField, PasswordField, TextField} from '../../componets'

export interface ProfileProps extends BaseComponetProps {
  styles: any
}

const avatar = new Avatar({
  name: 'avatar',
  title: 'Изменить аватар'
})

const firstName = new TextField({
  placeholder: 'First Name',
  name: 'first_name',
  className: styles['text-field'],
})

const secondName = new TextField({
  placeholder: 'Second Name',
  name: 'second_name',
  className: styles['text-field']
})

const displayName = new TextField({
  placeholder: 'Display name',
  name: 'display_name',
  className: styles['text-field']
})

const login = new TextField({
  placeholder: 'Create User name',
  name: 'login',
  className: styles['text-field']
})

const email = new EmailField({
  placeholder: 'Enter Emai',
  name: 'email',
  className: styles['text-field']
})

const oldPassword = new PasswordField({
  placeholder: 'Password',
  name: 'oldPassword',
  className: styles['text-field']
})

const newPassword = new PasswordField({
  placeholder: 'New Password',
  name: 'newPassword',
  className: styles['text-field']
})

const phone = new TextField({
  placeholder: 'Phone',
  name: 'phone',
  className: styles['text-field']
})

const save = new Button({title: 'Save'} )
const cancel = new Button({title: 'Cancel'} )

export class Profile extends BaseBlock<ProfileProps> {
  render() {
    return this.compile(profileTmpl, this.props)
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
      cancel
    },
    styles
  })
  render(selector, profile)
}
