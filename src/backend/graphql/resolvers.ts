import type { AddUserParams, DeleteUserParams, GetUserByEmailParams, GetUserParams, ListUserParams, UpdateUserParams } from "@app/utils/domain/types/UserParams";
import type { Context } from "../config/database/config";
import UserRepository from "../repositories/UserRepository";

export const resolvers = {
    Query: {
        user: async (_parent: unknown, args: GetUserParams, context: Context) => {
            const userRepository = new UserRepository(context.prisma)
            return await userRepository.getUser(args)
        },
        users: async (_parent: unknown, args: ListUserParams, context: Context) => {
            const userRepository = new UserRepository(context.prisma)
            return await userRepository.listUsers(args)
        },
        userByEmail: async (_parent: unknown, args: GetUserByEmailParams, context: Context) => {
            const userRepository = new UserRepository(context.prisma)
            return await userRepository.getUserByEmail(args)
        }
    },
    Mutation: {
        addUser: async (_parent: unknown, args: AddUserParams, context: Context) => {
            const userRepository = new UserRepository(context.prisma)
            return await userRepository.addUser(args)
        },
        updateUser: async (_parent: unknown, args: UpdateUserParams, context: Context) => {
            const userRepository = new UserRepository(context.prisma)
            return await userRepository.updateUser(args)
        },
        deleteUser: async (_parent: unknown, args: DeleteUserParams, context: Context) => {
            const userRepository = new UserRepository(context.prisma)
            return await userRepository.removeUser(args)
        }
    }
}