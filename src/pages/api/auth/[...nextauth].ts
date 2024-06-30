import { prisma } from "@app/backend/config/database/config";
import UserRepository from "@app/backend/repositories/UserRepository";
import UserUseCase from "@app/backend/usecase/user/UserUseCase";
import type { UserAuth } from "@app/utils/domain/types/UserSession";
import NextAuth, { type NextAuthOptions, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type CredentialsProviderProps = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "me@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        const { email, password } =
          credentials as unknown as CredentialsProviderProps;
        try {
          const userRepository = new UserRepository(prisma);
          const userUseCase = new UserUseCase(userRepository);
          const user = await userUseCase.authUser({ email, password });
          if (!user) {
            throw new Error("Invalid credentials");
          }
          const newSession: UserAuth = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
          return newSession;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token }) {
      const userRepository = new UserRepository(prisma);
      const userUseCase = new UserUseCase(userRepository);
      const user = await userUseCase.session({ email: token.email ?? "" });
      if (user) {
        token.role = user.role;
        token.picture = user.image;
        token.language = user.userConfig.language;
        token.theme = user.userConfig.theme;
        token.timeZone = user.userConfig.timeZone.zone;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token?.role;
        session.user.image = token.picture;
        session.user.theme = token.language;
        session.user.theme = token.theme;
        session.user.timeZone = token.timeZone;
        session.user.name = token.name;
      }
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
