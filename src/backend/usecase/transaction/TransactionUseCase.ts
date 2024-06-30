import type TransactionRepository from "@app/backend/repositories/TransactionRepository";
import type {
  AddTransactionRepositoryParams,
  CurrentBalanceTransactionParams,
  ListTransactionsParams,
} from "@app/utils/domain/types/transaction/TransactionParams";

export default class TransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async listTransactions(data: ListTransactionsParams) {
    try {
      return await this.transactionRepository.listTransactions(data);
    } catch (error) {
      return [];
    }
  }

  public async addTransaction(data: AddTransactionRepositoryParams) {
    try {
      return await this.transactionRepository.addTransaction(data);
    } catch (error) {
      return null;
    }
  }

  public async currentBalanceTransaction(
    data: CurrentBalanceTransactionParams,
  ) {
    try {
      let income = 0;
      let expense = 0;
      const balanceIncome =
        await this.transactionRepository.currentBalanceIncomeTransaction(data);
      const balanceExpense =
        await this.transactionRepository.currentBalanceExpenseTransaction(data);

      for (let index = 0; index < balanceIncome.length; index++) {
        const balance = balanceIncome[index];
        income += balance.amount;
      }

      for (let index = 0; index < balanceExpense.length; index++) {
        const balance = balanceExpense[index];
        expense += balance.amount;
      }

      return income - expense;
    } catch (error) {
      return 0;
    }
  }
}
