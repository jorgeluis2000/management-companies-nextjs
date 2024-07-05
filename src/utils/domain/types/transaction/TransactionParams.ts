import type { TypeTransaction } from "@prisma/client";

export type ListTransactionsParams = {
  limit: number;
  page: number;
  typeTransaction?: TypeTransaction;
  user?: string;
};

export type CountChartDataParams = {
  typeTransaction: TypeTransaction;
  createdAfter?: Date;
  createdBefore?: Date;
};

export type GetChartDataParams = {
  limit: number;
  page: number;
  typeTransaction: TypeTransaction;
  createdAfter?: Date | null;
  createdBefore?: Date | null;
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
