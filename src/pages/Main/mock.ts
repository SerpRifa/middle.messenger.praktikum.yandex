import avatar from '../../../static/img/avatar.png'
import no_avatar from '../../../static/img/no_avatar.jpg'

export interface IContact {
  avatar: any
  firstName: string
  lastName: string
  message: string
  unreadMessages: number
}

export interface IMessage {
  avatar: any
  firstName: string
  lastName: string
  message: string
  my: boolean
}

export interface IResponse {
  contacts: IContact[]
  messages: IMessage[]
}

export const contacts: IContact[] = [
  {
      avatar: avatar,
      firstName: 'Ash',
      lastName: 'Slayer',
      message: 'message',
      unreadMessages: 1
  },
  {
    avatar: no_avatar,
    firstName: 'Demon1',
    lastName: 'Demon1',
    message: 'message',
    unreadMessages: 6

  },
  {
    avatar: no_avatar,
    firstName: 'Demon2',
    lastName: 'Demon2',
    message: 'message',
    unreadMessages: 6

  },
  {
    avatar: no_avatar,
    firstName: 'Demon2',
    lastName: 'Demon2',
    message: 'message',
    unreadMessages: 0

  },
]

export const messages: IMessage[] = [
  {
    avatar: avatar,
    firstName: 'Ash',
    lastName: 'Slayer',
    message: 'Призываю тебя, демон!',
    my: true,
  },
  {
    avatar: no_avatar,
    firstName: 'Demon',
    lastName: 'Demon',
    message: 'Эшли! Как дела на грешной?',
    my: false,

  },
  {
    avatar: avatar,
    firstName: 'Ash',
    lastName: 'Slayer',
    message: 'Не кривляйся где мои деньги?',
    my: true
  },
  {
    avatar: no_avatar,
    firstName: 'Demon',
    lastName: 'Demon',
    message: 'В аду пока денег не платили, сорян... Как зарплата придет, я переведу. У тебя же сбер онлайн есть?',
    my: false

  },
]

export const data: IResponse = {
  contacts,
  messages
}
