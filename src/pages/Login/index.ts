import loginTmpl from "./Login.hbs";
import * as styles from "./Login.module.css";
import { BaseBlock } from "../../utils/base-block";
import { BaseComponetProps } from "../../types/types";
import { Router, withRouter } from "../../utils/router";
import { Fetch } from "../../utils/fetch";
import { button, emailField, passwordField } from "./components";

export interface LoginProps extends BaseComponetProps {
  styles: any;
}

export class Login extends BaseBlock<LoginProps> {
  render() {
    return this.compile(loginTmpl, this.props);
  }
}

export const loginProps = {
  components: {
    EmailField: emailField,
    PasswordField: passwordField,
    Button: button,
  },
  styles,
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      emailField.validateInput();
      passwordField.validateInput();
      const data: Record<string, string> = {};

      const inputFields = document.querySelectorAll("input");

      inputFields.forEach((input: HTMLInputElement) => {
        data[input.name] = input.value;
      });

      console.log(data);

      const fetch = new Fetch();
      fetch
        .post<{ reason: string }>("/auth/signin", { data })
        .then((response) => {
          console.log("response", response);
          const router = new Router();
          router.go("/main");
        })
        .catch((e) => console.error(e));
    },
  },
};

export default withRouter(Login);
