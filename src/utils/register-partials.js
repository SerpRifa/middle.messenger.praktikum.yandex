import Handlebars from 'handlebars/dist/handlebars.runtime'
import {
  Avatar,
  Button,
  Contact,
  Input,
  Message,
  TextField,
  PasswordField,
  EmailField
} from '../componets'

export const registerPartials = () => {
  Handlebars.registerPartial('Input', Input)
  Handlebars.registerPartial('Avatar', Avatar)
  Handlebars.registerPartial('Button', Button)
  Handlebars.registerPartial('Contact', Contact)
  Handlebars.registerPartial('Message', Message)
  Handlebars.registerPartial('TextField', TextField)
  Handlebars.registerPartial('PasswordField', PasswordField)
  Handlebars.registerPartial('EmailField', EmailField)
}
