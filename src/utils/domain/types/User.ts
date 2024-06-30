import type { Role, UserTheme } from "@prisma/client";

export type TUser = {
  id: string;
  image: string | null;
  email: string;
  name: string;
  role: Role;
  phone: string;
  userConfig: {
    id: string;
    timeZone: {
      zone: string;
      utcOffset: string;
    };
    theme: UserTheme;
    language: {
      code: string;
      name: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

export type TGetUserByEmail = {
  userByEmail: {
    id: string;
    image: string | null;
    email: string;
    name: string;
    phone: string;
    role: Role;
    userConfig: {
      id: string;
      timeZone: {
        zone: string;
        utcOffset: string;
      };
      theme: UserTheme;
      language: {
        code: string;
        name: string;
      };
    };
    createdAt: Date;
    updatedAt: Date;
  };
};

export type GetUserByEmailInput = {
  email: string;
};
