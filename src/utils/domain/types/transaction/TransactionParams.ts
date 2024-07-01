import type { TypeTransaction } from "@prisma/client";

export type ListTransactionsParams = {
  limit: number;
  page: number;
  typeTransaction?: TypeTransaction;
  user?: string;
};

export type CountTransactionsParams = {
  typeTransaction?: TypeTransaction;
  user?: string;
};

export type AddTransactionParams = {
  concept: string;
  amount: number;
  typeTransaction: TypeTransaction;
};

export type AddTransactionRepositoryParams = {
  concept: string;
  amount: number;
  typeTransaction: TypeTransaction;
  user: string;
};

export type CurrentBalanceTransactionParams = {
  user?: string;
};
