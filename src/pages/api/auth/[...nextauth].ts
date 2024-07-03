import { prisma } from "@app/backend/config/database/config";
import UserRepository from "@app/backend/repositories/UserRepository";
import UserUseCase from "@app/backend/usecase/user/UserUseCase";
import type {
  IUserSession,
  IUserSessionToken,
  UserAuth,
} from "@app/utils/domain/types/user/UserSession";
import {
  getMessages,
  resolveLocale,
} from "@app/utils/services/HandlerServerService";
import type { NextApiRequest } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createTranslator } from "next-intl";

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
        const locale = resolveLocale(req as NextApiRequest);
        const messages = await getMessages(locale);
        const t = createTranslator({
          locale,
          messages,
        });
        try {
          const userRepository = new UserRepository(prisma);
          const userUseCase = new UserUseCase(userRepository);
          const user = await userUseCase.authUser({ email, password });
          if (!user) {
            throw new Error(t("QueryError.invalidCredentials"));
          }
          const newSession: UserAuth = user;
          return newSession;
        } catch (error) {
          throw new Error(t("QueryError.invalidCredentials"));
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
      const newSession = session as IUserSession;
      if (token) {
        const newToken = token as IUserSessionToken;
        newSession.user.id = newToken.sub;
        newSession.user.role = newToken?.role;
        newSession.user.image = newToken.picture;
        newSession.user.language = newToken.language;
        newSession.user.theme = newToken.theme;
        newSession.user.timeZone = newToken.timeZone;
        newSession.user.name = newToken.name;
      }
      return newSession;
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
