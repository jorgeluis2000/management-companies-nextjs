import type { Role, UserTheme } from "@prisma/client";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

export type UserAuth = {
  id: string;
  email: string;
  name: string;
  role: string;
  image: string | null;
};

export interface IUserSession extends Session {
  user: {
    name?: string;
    email?: string;
    image?: string | null;
    id?: string;
    role?: Role;
    theme?: UserTheme;
    timeZone?: string;
    language?: string;
  };
}

export interface IUserSessionToken extends JWT {
  name?: string;
  email?: string;
  picture?: string | null;
  id?: string;
  role?: Role;
  theme?: UserTheme;
  timeZone?: string;
  language?: string;
}
