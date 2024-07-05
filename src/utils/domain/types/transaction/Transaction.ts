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


export type TTransactionChart = {
  amount: number;
  createdAt: Date;
  user: TUserTransaction;
}

export type TTransactionCSV = {
  amount: number;
  createdAt: Date;
  userEmail: string;
  userName: string;
  userRole: Role;
}

export type TGetChartData = {
  getChartData: TTransactionChart[]
}
export type TCountChartData = {
  countChartData: number
}

export type TListTransaction = {
  transactions: TTransaction[]
};

export type TCurrentBalanceTransaction = {
  currentBalance: number
};

export type TCountTransactions = {
  countTransactions: number
}

export type TAddTransaction = {
  addTransaction: TTransaction
}
