import avatar from '../../../static/img/avatar.png';
import noAvatar from '../../../static/img/no_avatar.jpg';

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
    avatar,
    firstName: 'Ash',
    lastName: 'Slayer',
    message: 'message',
    unreadMessages: 1,
  },
  {
    avatar: noAvatar,
    firstName: 'Demon1',
    lastName: 'Demon1',
    message: 'message',
    unreadMessages: 6,

  },
  {
    avatar: noAvatar,
    firstName: 'Demon2',
    lastName: 'Demon2',
    message: 'message',
    unreadMessages: 6,

  },
  {
    avatar: noAvatar,
    firstName: 'Demon2',
    lastName: 'Demon2',
    message: 'message',
    unreadMessages: 0,

  },
];

export const messages: IMessage[] = [
  {
    avatar,
    firstName: 'Ash',
    lastName: 'Slayer',
    message: 'Призываю тебя, демон!',
    my: true,
  },
  {
    avatar: noAvatar,
    firstName: 'Demon',
    lastName: 'Demon',
    message: 'Эшли! Как дела на грешной?',
    my: false,

  },
  {
    avatar,
    firstName: 'Ash',
    lastName: 'Slayer',
    message: 'Не кривляйся где мои деньги?',
    my: true,
  },
  {
    avatar: noAvatar,
    firstName: 'Demon',
    lastName: 'Demon',
    message: 'В аду пока денег не платили, сорян... Как зарплата придет, я переведу. '
      + 'У тебя же сбер онлайн есть?',
    my: false,

  },
];

export const data: IResponse = {
  contacts,
  messages,
};
