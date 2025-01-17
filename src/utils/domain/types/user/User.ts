import type { Role, UserTheme } from "@prisma/client";

export type TUser = {
  id: string;
  image: string | null;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  userConfig: TUserConfig;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserConfig = {
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

export type TGetUserByEmail = {
  userByEmail: TUser;
};

export type TListUser = {
  users: TUser[];
};

export type TMeUser = {
  user: TUser;
};

export type TAddUser = {
  addUser: TUser;
};

export type TUpdateUser = {
  updateUser: TUser;
};

export type TUpdateUserProfile = {
  updateProfile: TUser;
};

export type TCurrentCountUsers = {
  countUsers: number;
};
