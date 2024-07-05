import type { IUserSession } from "../domain/types/user/UserSession";

export const INIT_USER_SESSION_EMPTY: IUserSession = {
  expires: "",
  user: {
    id: "",
    email: "",
    image: "",
    language: "",
    name: "",
    phone: "",
    role: "ADMIN",
    theme: "AUTO",
    timeZone: "",
  },
};

export const INIT_LANGUAGE = "en";
export const INIT_THEME = "system";
export const INIT_TIMEZONE = "America/Los_Angeles";