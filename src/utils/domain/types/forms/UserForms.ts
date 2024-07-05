import type { Role, UserTheme } from "@prisma/client";

export type TUserAdd = {
  name: ValueItem<string>;
  role: ValueItem<Role>;
  email: ValueItem<string>;
  language?: ValueItem<string>;
  phone: ValueItem<string>;
  timeZone?: ValueItem<string>;
  theme: ValueItem<UserTheme>;
  image?: ValueItem<string>;
  password: ValueItem<string>;
  passwordConfirm: ValueItem<string>;
};

export type TUserEditProfile = {
  name: ValueItem<string>;
  role?: ValueItem<Role>;
  email: ValueItem<string>;
  language?: ValueItem<string>;
  phone: ValueItem<string>;
  timeZone?: ValueItem<string>;
  theme?: ValueItem<UserTheme>;
  image?: ValueItem<string>;
};

export type TUserUpdate = {
  id: ValueItem<string>;
  name: ValueItem<string>;
  role: ValueItem<Role>;
};

type ValueItem<T> = {
  value: T;
};
