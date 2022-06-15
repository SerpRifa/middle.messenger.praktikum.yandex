import registerTmpl from "./Register.hbs";
import * as styles from "../Login/Login.module.css";
import { BaseComponetProps } from "../../types/types";
import { BaseBlock } from "../../utils/base-block";
import { getServerUrl } from "../../utils/url";
import { Router, withRouter } from "../../utils/router";
import { Fetch } from "../../utils/fetch";
import { button, email, firstName, login, password, phone, secondName } from "./components";

export interface RegisterProps extends BaseComponetProps {
  styles: any;
}

export class Register extends BaseBlock<RegisterProps> {
  render() {
    return this.compile(registerTmpl, this.props);
  }
}

export const registerProp: RegisterProps = {
  components: {
    firstName,
    secondName,
    login,
    email,
    password,
    phone,
    button,
  },
  styles,
  events: {
    submit: (e) => {
      e.preventDefault();
      firstName.validateInput();
      secondName.validateInput();
      login.validateInput();
      email.validateInput();
      password.validateInput();
      phone.validateInput();

      const data: Record<string, string> = {};

      const inputFields = document.querySelectorAll("input");

      inputFields.forEach((input: HTMLInputElement) => {
        data[input.name] = input.value;
      });

      const fetch = new Fetch();
      const url = getServerUrl("/auth/signup");
      fetch
        .post(url, { data })
        .then((response) => {
          console.log(response);
          const router = new Router();
          router.go("/main");
        })
        .catch((e) => console.error(e));
    },
  },
};
export default withRouter(Register);
