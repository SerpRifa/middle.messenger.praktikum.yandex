import { BaseBlock } from "../utils/base-block";

export interface IChildComponents {
  [key: string]: BaseBlock | BaseBlock[];
}

export interface EventProps {
  [key: string]: (a: Event) => void;
}

export interface BaseComponetProps {
  className?: string;
  name?: string;
  components?: IChildComponents;
  events?: EventProps;
}

export interface IUserInfo {
  avatar: string | null;
  display_name: string | null;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

export interface INew {
  avatar: string | null;
  display_name: string | null;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

export interface SignupOptions {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface BaseMessage {
  chat_id: number;
  content: string;
  file: any;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface Message extends BaseMessage {
  isCurrentUserMessage?: boolean;
}
