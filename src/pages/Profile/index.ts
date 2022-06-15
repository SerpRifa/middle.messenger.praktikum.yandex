import profileTmpl from "./Profile.hbs";
import * as styles from "./Profile.module.css";
import { BaseBlock } from "../../utils/base-block";
import { BaseComponetProps, IUserInfo } from "../../types/types";
import { Avatar, Input } from "../../componets";
import { withRouter } from "../../utils/router";
import { profileApi } from "../../api/profile";
import { store, TState } from "../../store/shitstore";
import { connectFactory } from "../../store/connectFactory";
import {
  avatar,
  cancel,
  changeAvatar,
  displayName,
  email,
  firstName,
  login,
  newPassword,
  oldPassword,
  phone,
  save,
  secondName,
} from "./components";

export interface ProfileProps extends BaseComponetProps {
  styles: any;
  profile: IUserInfo;
  components: {
    avatar: Avatar;
    firstName: Input;
    secondName: Input;
    displayName: Input;
    login: Input;
    email: Input;
    oldPassword: Input;
    newPassword: Input;
    phone: Input;
    save: BaseBlock;
    cancel: BaseBlock;
  };
}

class ProfileBase extends BaseBlock<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
    console.log("props", props);
  }

  render() {
    return this.compile(profileTmpl, this.props);
  }
  componentDidMount() {
    profileApi.loadProfile().then((responce) => {
      store.set("profile", responce);
    });
  }

  componentDidUpdate(): void {
    console.log("componentDidUpdate");
    this.setComponents(this.props.profile);
  }

  setComponents(data: IUserInfo) {
    const { avatar, firstName, secondName, displayName, login, email, phone } = this.props.components;
    avatar.setProps({ avatar: data.avatar });
    firstName.setProps({ value: data.first_name });
    firstName.setProps({ value: data.first_name });
    secondName.setProps({ value: data.second_name });
    displayName.setProps({ value: data.display_name });
    login.setProps({ value: data.login });
    email.setProps({ value: data.email });
    phone.setProps({ value: data.phone });
  }
}

export const propsProfile = {
  components: {
    avatar,
    changeAvatar,
    firstName,
    secondName,
    displayName,
    login,
    email,
    oldPassword,
    newPassword,
    phone,
    save,
    cancel,
  },
  styles,
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      firstName.validateInput();
      secondName.validateInput();
      login.validateInput();
      email.validateInput();
      oldPassword.validateInput();
      newPassword.validateInput();
      phone.validateInput();

      const data: Record<string, string> = {};

      const inputFields = document.querySelectorAll("input");

      inputFields.forEach((input: HTMLInputElement) => {
        data[input.name] = input.value;
      });

      console.log(data);
      profileApi.changeProfile(data).then((responce) => {
        console.log("responce", responce);
      });
    },
  },
};

function mapUserToProps(state: TState) {
  return {
    profile: { ...state.profile },
  };
}

export const Profile = withRouter(connectFactory(ProfileBase, mapUserToProps));
