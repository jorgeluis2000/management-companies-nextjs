import type { AddUserParams, DeleteUserParams, GetUserByEmailParams, ListUserParams, UpdateUserParams } from "@app/utils/domain/types/UserParams";
import type { Context } from "../config/database/config";
import UserRepository from "../repositories/UserRepository";

export const resolvers = {
    Query: {
        user: async (_parent: unknown, _args: unknown, context: Context) => {
            if (context.session?.user.id) {
                const userRepository = new UserRepository(context.prisma)
                return await userRepository.getUser({ id: context.session.user.id })
            }
            throw new Error(context.t('QueryError.sessionAuthorization'))
        },
        users: async (_parent: unknown, args: ListUserParams, context: Context) => {
            if (context.session?.user.id && context.session.user.role !== 'ADMIN') {
                const userRepository = new UserRepository(context.prisma)
                return await userRepository.listUsers(args)
            }
            if (context.session?.user.id && context.session.user.role !== 'ADMIN') {
                throw new Error(context.t('QueryError.sessionAuthorization'))
            }
            throw new Error(context.t('QueryError.notAuthenticated'))
        },
        userByEmail: async (_parent: unknown, args: GetUserByEmailParams, context: Context) => {

            if (context.session?.user.id && context.session.user.role === 'ADMIN') {
                const userRepository = new UserRepository(context.prisma)
                return await userRepository.getUserByEmail(args)
            }
            if (context.session?.user.id && context.session.user.role !== 'ADMIN') {
                throw new Error(context.t('QueryError.sessionAuthorization'))
            }
            throw new Error(context.t('QueryError.notAuthenticated'))
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