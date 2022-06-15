import mainTmpl from "./Main.hbs";
import * as styles from "./Main.module.css";
import { Chat } from "./mock";
import { BaseBlock } from "../../utils/base-block";
import { BaseComponetProps, BaseMessage, Message as MessageWS, IUserInfo } from "../../types/types";
import { Contact, Message, MessageProps } from "../../componets";
import { withRouter } from "../../utils/router";
import { connect } from "../../store/connect";
import { chatApi } from "../../api/chat";
import { store, TState } from "../../store/shitstore";
import { profileApi } from "../../api/profile";
import { addChatButton, addChatInput, logout, message } from "./components";

export interface MainProps extends BaseComponetProps {
  contacts: Chat[];
  messages: MessageProps[];
  styles: any;
}

export class MainBase extends BaseBlock<MainProps> {
  activeSocket: WebSocket;

  private getContact(chat: Chat): Contact {
    return new Contact({
      firstName: chat.title,
      lastName: chat?.last_message?.user?.second_name ?? "",
      message: chat?.last_message?.content ?? "",
      avatar: chat.avatar,
      unreadMessages: chat.unread_count,
      id: chat.id,
    });
  }

  render() {
    const messages = this.props.messages.map((message) => new Message({ ...message }));
    const contacts = this.props.contacts.map((contact) => this.getContact(contact));
    const components = {
      ...this.props.components,
      messages,
      contacts,
    };
    return this.compile(mainTmpl, { ...this.props, components });
  }

  componentDidMount() {
    chatApi
      .loadChats()
      .then((responce) => {
        store.set("chat.chats", responce);
      })
      .then(() => profileApi.loadProfile())
      .then((profile) => store.set("profile", profile))
      .then(() => console.log("store", store));
  }

  componentDidUpdate() {
    const contacts = document.querySelectorAll(".contact");

    console.log("componentDidUpdate");

    contacts.forEach((contact) => {
      contact.addEventListener("click", (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        const id = event.currentTarget.getAttribute("data-id");

        const currentUser = store.getState().profile;
        store.set("chat.messages", []);
        console.log("currentUser", currentUser);
        chatApi.getChatToken(id).then((data) => {
          this.openSocket(currentUser.id, id, data.token);
        });
      });
    });

    let message = document.querySelector("[name='message']");
    message.outerHTML = message.outerHTML;
    message = document.querySelector("[name='message']");
    message?.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (e?.target?.value) {
          const content = e.target.value;
          if (this.activeSocket) {
            this.activeSocket.send(
              JSON.stringify({
                content: content,
                time: new Date(),
                type: "message",
              })
            );
          }
          e.target.value = "";
        }
      }
    });
    console.log("message", message);
  }

  openSocket(userId: number, chatId: number, token: string) {
    console.log(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.activeSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    this.activeSocket.addEventListener("open", () => {
      console.log("Соединение установлено");

      this.activeSocket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    });

    this.activeSocket.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "user connected") {
        console.log(`User connected: `, response.content);
      } else {
        const { profile } = store.getState();

        const addmessages = Array.isArray(response)
          ? response.map((item) => this.getCustomMessage(item, profile)).reverse()
          : [this.getCustomMessage(response, profile)];

        store.addMassage(addmessages);

        console.log(store);
      }
    });

    this.activeSocket.addEventListener("close", () => {
      console.log("Соединение закрыто");
    });
  }

  getCustomMessage(message: BaseMessage, user: IUserInfo): MessageWS {
    return {
      ...message,
      isCurrentUserMessage: user.id === message.user_id,
    };
  }
}

export const mainProps = {
  components: {
    addChatInput,
    addChatButton,
    message,
    logout,
  },
  styles,
  events: {
    submit: (e: Event) => {
      e.preventDefault();
    },
  },
};

function mapUserToProps(state: TState) {
  return {
    contacts: state.chat.chats,
    messages: state.chat.messages,
  };
}

export const Main = withRouter(connect(MainBase, mapUserToProps));
