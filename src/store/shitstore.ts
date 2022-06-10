import { EventBus } from "../utils/event-bus";
import { set } from "../utils/set";
import {Message as MessageWS} from "../types/types";

export enum StoreEvents {
  Updated = "updated",
}

const defaultState = {
  profile: {
    avatar: null,
    display_name: "",
    email: "",
    first_name: "",
    id: 0,
    login: "",
    phone: "",
    second_name: "",
  },
  chat: {
    chats: [],
    messages: []
  },
};

type TState = typeof defaultState;

class Store extends EventBus {
  private state: TState;

  constructor(defaultState: any) {
    super();
    this.state = defaultState;
  }
  public getState() {
    return this.state;
  }
  set(prop: string, value: any): void {
    // @ts-ignore
    this.state = set(this.state, prop, value)
    this.emit(StoreEvents.Updated);
  }

  addMassage(addMessages: MessageWS[]) {
    // @ts-ignore
    this.state.chat.messages = [...this.state.chat.messages, ...addMessages ];
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store(defaultState);
