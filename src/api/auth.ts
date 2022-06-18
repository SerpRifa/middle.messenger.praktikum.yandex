import { fetch } from "../utils/fetch";
import { IUserInfo, SignupOptions } from "../types/types";

class AuthApi {
  signUp({ first_name, second_name, login, email, password, phone }: SignupOptions): Promise<{ id: number }> {
    const data = { first_name, second_name, login, email, password, phone };

    return fetch.post("/auth/signup", {
      data,
      withCredentials: true,
    });
  }

  signIn(data: { login: string; password: string }) {
    return fetch.post<{ reason: string }>("/auth/signin", {
      data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      withCredentials: true,
    });
  }

  user(): Promise<IUserInfo> {
    return fetch.get("/auth/user", {
      withCredentials: true,
    });
  }

  logout(): Promise<void> {
    return fetch.post("/auth/logout", {
      withCredentials: true,
    });
  }
}

export const authApi = new AuthApi();
