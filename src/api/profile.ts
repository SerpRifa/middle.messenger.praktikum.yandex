import { fetch } from "../utils/fetch";
import { IUserInfo } from "../types/types";

export class ProfileApi {
  loadProfile(): Promise<IUserInfo> {
    return fetch.get("/auth/user");
  }

  changeProfile(data: any): Promise<IUserInfo> {
    return fetch.put("/user/profile", { data });
  }

  changeProfileAvatar(data: FormData): Promise<IUserInfo> {
    return fetch.put("/user/profile/avatar", {
      data,
      file: true,
    });
  }
}

export const profileApi = new ProfileApi();
