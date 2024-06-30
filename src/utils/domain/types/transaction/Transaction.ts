import type { Role, TypeTransaction } from "@prisma/client";

export type TTransaction = {
  id: string;
  concept: string;
  amount: number;
  typeTransaction: TypeTransaction;
  idUser: string;
  user: TUserTransaction;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserTransaction = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type TListTransaction = {
  transactions: TTransaction
};

export type TAddTransaction = {
  addTransaction: TTransaction
}
