import type {
  AddUserParams,
  DeleteUserParams,
  GetUserByEmailParams,
  ListUserParams,
  UpdateUserParams,
} from "@app/utils/domain/types/user/UserParams";
import { prisma, type Context } from "../config/database/config";
import UserRepository from "../repositories/UserRepository";
import UserUseCase from "../usecase/user/UserUseCase";
import TransactionRepository from "../repositories/TransactionRepository";
import TransactionUseCase from "../usecase/transaction/TransactionUseCase";
import type {
  AddTransactionParams,
  CountChartDataParams,
  CountTransactionsParams,
  CurrentBalanceTransactionParams,
  GetChartDataParams,
  ListTransactionsParams,
} from "@app/utils/domain/types/transaction/TransactionParams";
import {
  InvalidCredentialError,
  NotAuthenticatedError,
  SessionError,
  UnknownError,
} from "@app/utils/errors/ExceptionFactory";
import UserValidator from "../validators/UserValidator";

const userRepository = new UserRepository(prisma);
const transactionRepository = new TransactionRepository(prisma);
const userUseCase = new UserUseCase(userRepository);
const transactionUseCase = new TransactionUseCase(transactionRepository);
const userValidator = new UserValidator();

export const resolvers = {
  Query: {
    user: async (_parent: unknown, _args: unknown, context: Context) => {
      if (context.session?.user.id) {
        return await userUseCase.getUser({ id: context.session.user.id });
      }
      throw new Error(context.t("QueryError.sessionAuthorization"));
    },
    users: async (_parent: unknown, args: ListUserParams, context: Context) => {
      if (context.session?.user.id && context.session.user.role === "ADMIN") {
        return await userUseCase.listUsers(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    userByEmail: async (
      _parent: unknown,
      args: GetUserByEmailParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role === "ADMIN") {
        return await userUseCase.getUserByEmail(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    transactions: async (
      _parent: unknown,
      args: ListTransactionsParams,
      context: Context,
    ) => {
      if (context.session?.user.id) {
        return await transactionUseCase.listTransactions(args);
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    currentBalance: async (
      _parent: unknown,
      args: CurrentBalanceTransactionParams,
      context: Context,
    ) => {
      if (context.session?.user.id) {
        return await transactionUseCase.currentBalanceTransaction(args);
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    countTransactions: async (
      _parent: unknown,
      args: CountTransactionsParams,
      context: Context,
    ) => {
      if (context.session?.user.id) {
        return await transactionUseCase.countTransactions(args);
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    countUsers: async (_parent: unknown, _args: unknown, context: Context) => {
      if (context.session?.user.id) {
        return await userUseCase.countUsers();
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    getChartData: async (
      _parent: unknown,
      args: GetChartDataParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role === "ADMIN") {
        return await transactionUseCase.getChartData(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    countChartData: async (
      _parent: unknown,
      args: CountChartDataParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role === "ADMIN") {
        return await transactionUseCase.countChartData(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
  },
  Mutation: {
    addUser: async (
      _parent: unknown,
      args: AddUserParams,
      context: Context,
    ) => {
      try {
        if (context.session?.user.id && context.session.user.role === "ADMIN") {
          const validationAddUser = userValidator.validationAddUser(args);
          if (validationAddUser.length > 0) {
            throw new InvalidCredentialError(validationAddUser[0].message);
          }
          return await userUseCase.addUser(args);
        }
        if (context.session?.user.id && context.session.user.role !== "ADMIN") {
          throw new SessionError(context.t("QueryError.sessionAuthorization"));
        }
        throw new NotAuthenticatedError(context.t("QueryError.notAuthenticated"));
      } catch (error) {
        const catchError: { name: string; message: string } = error as {
          name: string;
          message: string;
        };
        if (catchError.name === "InvalidCredentialError") {
          throw new InvalidCredentialError(catchError.message);
        }
        if (catchError.name === "NotAuthenticatedError") {
          throw new NotAuthenticatedError(catchError.message);
        }

        if (catchError.name === "NotAuthenticatedError") {
          throw new SessionError(catchError.message);
        }

        throw new UnknownError(context.t("QueryError.invalidCredentials"));
      }
      
    },
    updateUser: async (
      _parent: unknown,
      args: UpdateUserParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role === "ADMIN") {
        return await userUseCase.updateUser(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    deleteUser: async (
      _parent: unknown,
      args: DeleteUserParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role === "ADMIN") {
        return await userUseCase.removeUser(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    addTransaction: async (
      _parent: unknown,
      args: AddTransactionParams,
      context: Context,
    ) => {
      if (context.session?.user.id) {
        return await transactionUseCase.addTransaction({
          concept: args.concept,
          user: context.session.user.id,
          amount: args.amount,
          typeTransaction: args.typeTransaction,
        });
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
  },
};
