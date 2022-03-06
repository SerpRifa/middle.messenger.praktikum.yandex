import registerTmpl from './Register.hbs'
import * as styles from '../Login/Login.module.css'
import {BaseComponetProps} from '../../types/types'
import { BaseBlock } from '../../utils/base-block'
import {render} from '../../utils/render'
import {TextField, EmailField, PasswordField, Button} from '../../componets'

export interface RegisterProps extends BaseComponetProps {
  styles: any
}

// {{> TextField placeholder='First Name' name='first_name' className='' }}
// {{> TextField placeholder='Second Name' name='second_name' className=styles.text-field }}
// {{> TextField placeholder='Create User name' name='login' className=styles.text-field }}
// {{> EmailField placeholder='Enter Emai' name='email' className=styles.text-field }}
// {{> PasswordField placeholder='Password' name='password' className=styles.text-field }}
// {{> TextField placeholder='Phone' name='phone' className=styles.text-field }}
// {{> Button title='renderRegister' className='' }}

const firstName = new TextField({
  placeholder: 'First Name',
  name: 'first_name',
})

const secondName = new TextField({
  placeholder: 'Second Name',
  name: 'second_name',
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

const password = new PasswordField({
  placeholder: 'Password',
  name: 'password',
  className: styles['text-field']
})

const phone = new PasswordField({
  placeholder: 'Phone',
  name: 'phone',
  className: styles['text-field']
})

const button = new Button({title: 'Register'} )

export class Register extends BaseBlock<RegisterProps> {
  render() {
    return this.compile(registerTmpl, this.props)
  }
}

export const renderRegister = (selector: string) => {
  const register = new Register({
    components: {
      firstName,
      secondName,
      login,
      email,
      password,
      phone,
      button
    },
    styles
  })
  render(selector, register)
}
