import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../prisma/db"
import UserRepository from "@app/backend/repositories/UserRepository";
import UserUseCase from "@app/backend/usecase/user/UserUseCase";
import type { UserAuth } from "@app/utils/domain/types/UserSession";

type CredentialsProviderProps = {
  email: string
  password: string
}



export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: "email", placeholder: "me@email.com" },
        password: { label: 'Password', type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as unknown as CredentialsProviderProps
        try {
          const userRepository = new UserRepository(prisma)
          const userUseCase = new UserUseCase(userRepository)
          const user = await userUseCase.authUser({ email, password })
          if (!user) {
            throw new Error("Invalid credentials")
          }
          const newSession: UserAuth = { id: user.id, email: user.email, name: user.name, role: user.role, image: user.image }
          return newSession
        } catch (error) {
          throw new Error("Invalid credentials")
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/"
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },
  secret: process.env.AUTH_SECRET || ''
};
export default NextAuth(authOptions);
