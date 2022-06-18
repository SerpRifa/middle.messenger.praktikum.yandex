import * as styles from "./Main.module.css";
import { Button, TextField } from "../../componets";
import { Router } from "../../utils/router";
import { chatApi } from "../../api/chat";
import { store } from "../../store/shitstore";
import { authApi } from "../../api/auth";

export const addChatInput = new TextField({
  placeholder: "Добавить чат...",
  name: "newChat",
  className: styles["search-input"],
});

export const addChatButton = new Button({
  title: "+",
  name: "addChatButton",
  events: {
    click: (e) => {
      e.preventDefault();
      const newChat = document.querySelector(`[name="newChat"]`) as HTMLInputElement;
      if (newChat?.value) {
        chatApi
          .createChat({ title: newChat?.value })
          .then(() => chatApi.loadChats())
          .then((responce) => store.set("chat.chats", responce));
      }
    },
  },
});

export const message = new TextField({
  placeholder: "Type text...",
  name: "message",
});

export const logout = new Button({
  title: "Log out",
  name: "button",
  className: styles["logout"],
  events: {
    click: (e) => {
      e.preventDefault();
      authApi
        .logout()
        .then((response) => {
          console.log(response);
          const router = new Router();
          router.go("/login");
        })
        .catch((e) => console.error(e));
    },
  },
});
