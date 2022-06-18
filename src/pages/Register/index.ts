import registerTmpl from "./Register.hbs";
import * as styles from "../Login/Login.module.css";
import { BaseComponetProps, SignupOptions } from "../../types/types";
import { BaseBlock } from "../../utils/base-block";
import { getServerUrl } from "../../utils/url";
import { Router, withRouter } from "../../utils/router";
import { fetch } from "../../utils/fetch";
import { button, email, firstName, login, password, phone, secondName } from "./components";
import { authApi } from "../../api/auth";

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

      const data: SignupOptions = {
        first_name: "",
        second_name: "",
        login: "",
        email: "",
        password: "",
        phone: "",
      };

      const inputFields = document.querySelectorAll("input");

      inputFields.forEach((input: HTMLInputElement) => {
        if (input.name in data) {
          data[input.name] = input.value;
        }
      });

      authApi.signUp(data as SignupOptions)
        .then(() => {
          const router = new Router();
          router.go("/main");
        })
        .catch((e) => console.error(e));
    },
  },
};
export default withRouter(Register);
