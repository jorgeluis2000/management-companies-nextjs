import type { Role, UserTheme } from "@prisma/client";

export type GetUserParams = {
  id: string;
};

export type GetUserByEmailParams = {
  email: string;
};

export type ListUserParams = {
  limit: number;
  page: number;
};

export type AddUserParams = {
  email: string;
  name: string;
  role: Role;
  image?: string;
  phone: string;
  password: string;
  language: string;
  timeZone: string;
  theme: UserTheme;
};

export type UpdateUserParams = {
  id: string;
  email?: string;
  name?: string;
  role?: Role;
  image?: string;
  phone?: string;
  password?: string;
  language?: string;
  timeZone?: string;
  theme?: UserTheme;
};

export type DeleteUserParams = {
  id: string;
};

export type AuthUserParams = {
  email: string;
  password: string;
};
