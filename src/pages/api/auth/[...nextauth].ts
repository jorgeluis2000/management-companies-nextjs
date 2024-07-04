import { prisma } from "@app/backend/config/database/config";
import UserRepository from "@app/backend/repositories/UserRepository";
import UserUseCase from "@app/backend/usecase/user/UserUseCase";
import UserValidator from "@app/backend/validators/UserValidator";
import type {
  IUserSession,
  IUserSessionToken,
  UserAuth,
} from "@app/utils/domain/types/user/UserSession";
import {
  InvalidCredentialError,
  UnknownError,
} from "@app/utils/errors/ExceptionFactory";
import {
  getMessages,
  resolveLocale,
} from "@app/utils/services/HandlerServerService";
import type { NextApiRequest } from "next";
import NextAuth, { type User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createTranslator } from "next-intl";
import Auth0Provider from "next-auth/providers/auth0";
import type { TUser } from "@app/utils/domain/types/user/User";

type CredentialsProviderProps = {
  email: string;
  password: string;
};
const userRepository = new UserRepository(prisma);
const userUseCase = new UserUseCase(userRepository);
const userValidator = new UserValidator();
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      async profile(profile, _tokens) {
        const credential: User = {
          id: profile.aud,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };

        let userCreated: TUser | null = null;
        const userRepository = new UserRepository(prisma);
        const userUseCase = new UserUseCase(userRepository);
        try {
          const user = await userUseCase.getUserByEmail(profile.email);
          if (!user) {
            userCreated = await userUseCase.addUser({
              email: profile.email,
              language: "es",
              name: profile.name,
              password: "",
              role: "ADMIN",
              theme: "AUTO",
              timeZone: "America/Bogota",
              image: profile.picture,
            });

            if (userCreated) {
              credential.id = userCreated.id;
            } else {
              throw new InvalidCredentialError(
                "Lo sentimos tuvimos problemas con la session vuelve a intentarlo más tarde.",
              );
            }
          } else {
            credential.id = user.id;
          }
        } catch (error) {
          console.error("Error in profile function:", error);
          throw new UnknownError("Error fetching or creating user");
        }
        return credential;
      },
    }),
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
          const validationAuth = userValidator.validationAuth({
            email,
            password,
          });
          if (validationAuth.length > 0) {
            throw new InvalidCredentialError(validationAuth[0].message);
          }
          const user = await userUseCase.authUser({ email, password });
          if (!user) {
            throw new InvalidCredentialError(
              t("QueryError.invalidCredentials"),
            );
          }
          const newSession: UserAuth = user;
          return newSession;
        } catch (error) {
          const catchError: { name: string; message: string } = error as {
            name: string;
            message: string;
          };
          if (catchError.name === "InvalidCredentialError") {
            throw new InvalidCredentialError(catchError.message);
          }

          throw new UnknownError(t("QueryError.invalidCredentials"));
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
    async jwt({ token, trigger, session }) {
      const userRepository = new UserRepository(prisma);
      const userUseCase = new UserUseCase(userRepository);
      const user = await userUseCase.session({ email: token.email ?? "" });
      if (trigger === "update") {
        return {...token, ...session.user}
      }
      if (user) {
        token.role = user.role;
        token.phone = user.phone;
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
        newSession.user.phone = newToken?.phone;
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
