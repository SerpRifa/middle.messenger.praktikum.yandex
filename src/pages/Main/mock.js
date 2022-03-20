import avatar from '../../../static/img/avatar.png'
import no_avatar from '../../../static/img/no_avatar.jpg'

export const contactList = [
  {
    contactContext:
      {
        avatarContext: {
          avatar: avatar
        },
        firstName: 'Ash',
        lastName: 'Slayer',
        message: 'message',
        unreadMessages: 1
      }
  },
  {
    contactContext:
      {
        avatarContext: {
          avatar: no_avatar
        },
        firstName: 'Demon1',
        lastName: 'Demon1',
        message: 'message',
        unreadMessages: 6
      }
  },
  {
    contactContext:
      {
        avatarContext: {
          avatar: no_avatar
        },
        firstName: 'Demon2',
        lastName: 'Demon2',
        message: 'message',
        unreadMessages: 6
      }
  },
  {
    contactContext:
      {
        avatarContext: {
          avatar: no_avatar
        },
        firstName: 'Demon2',
        lastName: 'Demon2',
        message: 'message',
        unreadMessages: 0
      }
  },
]

export const messagesList = [
  {
    messageContext:
      {
        avatarContext: {
          avatar: avatar
        },
        firstName: 'Ash',
        lastName: 'Slayer',
        message: 'Призываю тебя, демон!'
      }
  },
  {
    messageContext:
      {
        avatarContext: {
          avatar: no_avatar
        },
        firstName: 'Demon',
        lastName: 'Demon',
        message: 'Эшли! Как дела на грешной?'
      }
  },
  {
    messageContext:
      {
        avatarContext: {
          avatar: avatar
        },
        firstName: 'Ash',
        lastName: 'Slayer',
        message: 'Не кривляйся где мои деньги?'
      }
  },
  {
    messageContext:
      {
        avatarContext: {
          avatar: no_avatar
        },
        firstName: 'Demon',
        lastName: 'Demon',
        message: 'В аду пока денег не платили, сорян... Как зарплата придет, я переведу. У тебя же сбер онлайн есть?'
      }
  },
]

export const data = {
  contactList,
  messagesList
}
