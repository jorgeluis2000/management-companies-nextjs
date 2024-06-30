import type {
  AddUserParams,
  DeleteUserParams,
  GetUserByEmailParams,
  ListUserParams,
  UpdateUserParams,
} from "@app/utils/domain/types/UserParams";
import { prisma, type Context } from "../config/database/config";
import UserRepository from "../repositories/UserRepository";
import UserUseCase from "../usecase/user/UserUseCase";

const userRepository = new UserRepository(prisma);
const userUseCase = new UserUseCase(userRepository);

export const resolvers = {
  Query: {
    user: async (_parent: unknown, _args: unknown, context: Context) => {
      if (context.session?.user.id) {
        return await userUseCase.getUser({ id: context.session.user.id });
      }
      throw new Error(context.t("QueryError.sessionAuthorization"));
    },
    users: async (_parent: unknown, args: ListUserParams, context: Context) => {
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
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
  },
  Mutation: {
    addUser: async (
      _parent: unknown,
      args: AddUserParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        return await userUseCase.addUser(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
    },
    updateUser: async (
      _parent: unknown,
      args: UpdateUserParams,
      context: Context,
    ) => {
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
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
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        return await userUseCase.removeUser(args);
      }
      if (context.session?.user.id && context.session.user.role !== "ADMIN") {
        throw new Error(context.t("QueryError.sessionAuthorization"));
      }
      throw new Error(context.t("QueryError.notAuthenticated"));
      
    },
  },
};
