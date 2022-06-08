import { fetch } from "../utils/fetch";
import { Chat } from "../pages/Main/mock";
import {IUserInfo} from "../types/types";

export class ChatApi {
  loadChats(): Promise<Chat[]> {
    return fetch.get("/chats");
  }

  createChat(data: { title: string }): Promise<{ reason: "string" }> {
    return fetch.post("/chats", { data });
  }

  addUsersToChat(users: number[], chatId: number): Promise<IUserInfo> {
    return fetch.put(`/chats/users`, {
      data: {
        users,
        chatId,
      },
    });
  }

  getChatUsers(id: number): Promise<IUserInfo> {
    return fetch.get(`/chats/${id}/users`);
  }

  deleteUserFromChat(users: number[], chatId: number): Promise<IUserInfo> {
    return fetch.delete(`/chats/users`, {
      data: {
        users,
        chatId,
      },
    });
  }

  getChatToken(chatId: number): Promise<{ token: string }> {
    return fetch.post(`/chats/token/${chatId}`, {  });
  }
}

export const chatApi = new ChatApi();
