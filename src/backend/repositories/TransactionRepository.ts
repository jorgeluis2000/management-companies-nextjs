import type {
  AddTransactionRepositoryParams,
  CurrentBalanceTransactionParams,
  ListTransactionsParams,
} from "@app/utils/domain/types/transaction/TransactionParams";
import type { PrismaClient } from "@prisma/client";

export default class TransactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async listTransactions(data: ListTransactionsParams) {
    try {
      const skip = (data.page - 1) * data.limit;
      const transactions = await this.prisma.transaction.findMany({
        where: {
          typeTransaction: data.typeTransaction,
          idUser: data.user,
        },
        select: {
          id: true,
          amount: true,
          concept: true,
          typeTransaction: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
        },
        skip,
        take: data.limit,
      });
      return transactions;
    } catch (error) {
      console.log(
        "🚀 ~ TransactionRepository ~ listTransactions ~ error:",
        error,
      );
      return [];
    }
  }

  public async addTransaction(data: AddTransactionRepositoryParams) {
    try {
      const transaction = await this.prisma.transaction.create({
        data: {
          amount: data.amount,
          typeTransaction: data.typeTransaction,
          concept: data.concept,
          user: {
            connect: {
              id: data.user,
            },
          },
        },
      });
      return transaction;
    } catch (error) {
      return null;
    }
  }

  public async currentBalanceIncomeTransaction(
    data: CurrentBalanceTransactionParams,
  ) {
    try {
      const balance = await this.prisma.transaction.findMany({
        where: {
          typeTransaction: "INCOME",
          idUser: data.user,
        },
        select: {
          typeTransaction: true,
          amount: true,
        },
      });
      return balance;
    } catch (error) {
      return [];
    }
  }

  public async currentBalanceExpenseTransaction(
    data: CurrentBalanceTransactionParams,
  ) {
    try {
      const balance = await this.prisma.transaction.findMany({
        where: {
          typeTransaction: "EXPENSE",
          idUser: data.user,
        },
        select: {
          typeTransaction: true,
          amount: true,
        },
      });
      return balance;
    } catch (error) {
      return [];
    }
  }
}
