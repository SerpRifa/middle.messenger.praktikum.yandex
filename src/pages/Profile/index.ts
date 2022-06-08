import profileTmpl from "./Profile.hbs";
import * as styles from "./Profile.module.css";
import { BaseBlock } from "../../utils/base-block";
import { BaseComponetProps, IUserInfo } from "../../types/types";
import { Avatar, Button, ChangeAvatar, EmailField, Input, PasswordField, TextField } from "../../componets";
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from "../../utils/validators";
import { withRouter } from "../../utils/router";
import { profileApi } from "../../api/profile";
import { store, StoreEvents } from "../../store/shitstore";
import { connect } from "../../store/connect";

export interface ProfileProps extends BaseComponetProps {
  styles: any;
  profile: any;
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

const avatar = new Avatar({
  name: "avatar",
  title: "Изменить аватар",
});

const changeAvatar = new ChangeAvatar({
  events: {
    submit: (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("event.currentTarget", event.currentTarget);
      const form = new FormData(event.currentTarget);
      console.log("form", form);
      profileApi.changeProfileAvatar(form);
    },
  },
});

const firstName = new Input(
  {
    placeholder: "First Name",
    name: "first_name",
    className: styles["text-field"],
  },
  [nameValidator]
);

const secondName = new TextField(
  {
    placeholder: "Second Name",
    name: "second_name",
    className: styles["text-field"],
  },
  [nameValidator]
);

const displayName = new TextField({
  placeholder: "Display name",
  name: "display_name",
  className: styles["text-field"],
});

const login = new TextField(
  {
    placeholder: "Create User name",
    name: "login",
    className: styles["text-field"],
  },
  [loginValidator]
);

const email = new EmailField(
  {
    placeholder: "Enter Emai",
    name: "email",
    className: styles["text-field"],
  },
  [emailValidator]
);

const oldPassword = new PasswordField(
  {
    placeholder: "Password",
    name: "oldPassword",
    className: styles["text-field"],
  },
  [passwordValidator]
);

const newPassword = new PasswordField(
  {
    placeholder: "New Password",
    name: "newPassword",
    className: styles["text-field"],
  },
  [passwordValidator]
);

const phone = new TextField(
  {
    placeholder: "Phone",
    name: "phone",
    className: styles["text-field"],
  },
  [phoneValidator]
);

const save = new Button({ title: "Save" });
const cancel = new Button({ title: "Cancel" });

class ProfileBase extends BaseBlock<ProfileProps> {
  constructor(props: any) {
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
    console.log('componentDidUpdate')
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

function mapUserToProps(state: any) {
  return {
    profile: {...state.profile},
  };
}

// @ts-ignore
export const Profile = withRouter(connect(ProfileBase, mapUserToProps));
