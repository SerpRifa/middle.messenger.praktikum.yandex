import * as styles from "./Login.module.css";
import { EmailField, PasswordField, Button } from "../../componets";
import { emailValidator, passwordValidator } from "../../utils/validators";

export const emailField = new EmailField(
  {
    placeholder: "Enter email or user name",
    name: "login",
  },
  [emailValidator]
);

export const passwordField = new PasswordField(
  {
    placeholder: "Password",
    name: "password",
    className: styles["text-field"],
  },
  [passwordValidator]
);

export const button = new Button({ title: "Sign in" });


