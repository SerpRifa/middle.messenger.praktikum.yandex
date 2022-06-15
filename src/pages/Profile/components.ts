import * as styles from "./Profile.module.css";
import { Avatar, Button, ChangeAvatar, EmailField, Input, PasswordField, TextField } from "../../componets";
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from "../../utils/validators";
import { profileApi } from "../../api/profile";


export const avatar = new Avatar({
  name: "avatar",
  title: "Изменить аватар",
});

export const changeAvatar = new ChangeAvatar({
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("event.currentTarget", event.currentTarget);
      const form = new FormData(event.currentTarget as HTMLFormElement);
      console.log("form", form);
      profileApi.changeProfileAvatar(form);
    },
  },
});

export const firstName = new Input(
  {
    placeholder: "First Name",
    name: "first_name",
    className: styles["text-field"],
  },
  [nameValidator]
);

export const secondName = new TextField(
  {
    placeholder: "Second Name",
    name: "second_name",
    className: styles["text-field"],
  },
  [nameValidator]
);

export const displayName = new TextField({
  placeholder: "Display name",
  name: "display_name",
  className: styles["text-field"],
});

export const login = new TextField(
  {
    placeholder: "Create User name",
    name: "login",
    className: styles["text-field"],
  },
  [loginValidator]
);

export const email = new EmailField(
  {
    placeholder: "Enter Emai",
    name: "email",
    className: styles["text-field"],
  },
  [emailValidator]
);

export const oldPassword = new PasswordField(
  {
    placeholder: "Password",
    name: "oldPassword",
    className: styles["text-field"],
  },
  [passwordValidator]
);

export const newPassword = new PasswordField(
  {
    placeholder: "New Password",
    name: "newPassword",
    className: styles["text-field"],
  },
  [passwordValidator]
);

export const phone = new TextField(
  {
    placeholder: "Phone",
    name: "phone",
    className: styles["text-field"],
  },
  [phoneValidator]
);

export const save = new Button({ title: "Save" });
export const cancel = new Button({ title: "Cancel" });

