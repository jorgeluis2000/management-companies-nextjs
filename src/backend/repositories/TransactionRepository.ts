import type {
  AddTransactionRepositoryParams,
  CountTransactionsParams,
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
        orderBy: [
          {
            createdAt: 'desc'
          }
        ],
        skip,
        take: data.limit,
      });
      return transactions;
    } catch (error) {
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
      const balance = await this.prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          typeTransaction: "INCOME",
          idUser: data.user,
        },
      });
      return balance._sum.amount !== null ? balance._sum.amount : 0;
    } catch (error) {
      return 0;
    }
  }

  public async currentBalanceExpenseTransaction(
    data: CurrentBalanceTransactionParams,
  ) {
    try {
      const balance = await this.prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          typeTransaction: "EXPENSE",
          idUser: data.user,
        },
      });
      return balance._sum.amount !== null ? balance._sum.amount : 0;
    } catch (error) {
      return 0;
    }
  }

  public async countTransactions(data: CountTransactionsParams) {
    try {
      return await this.prisma.transaction.count({
        where: {
          typeTransaction: data.typeTransaction,
          idUser: data.user,
        },
      });
    } catch (error) {
      return 0;
    }
  }
}
