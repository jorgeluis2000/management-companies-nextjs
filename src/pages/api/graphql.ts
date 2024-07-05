import { ApolloServer } from "@apollo/server";
import { prisma } from "@app/backend/config/database/config";
import type { Context } from "@app/backend/config/database/config";
import { resolvers } from "@app/backend/graphql/resolvers";
import { typeDefs } from "@app/backend/graphql/schemas";
import type { IUserSession } from "@app/utils/domain/types/user/UserSession";
import {
  getMessages,
  resolveLocale,
} from "@app/utils/services/HandlerServerService";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getServerSession } from "next-auth";
import { createTranslator } from "next-intl";
import { authOptions } from "./auth/[...nextauth]";

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const locale = resolveLocale(req);
    const messages = await getMessages(locale);
    const t = createTranslator({
      locale,
      messages,
    });
    const session = (await getServerSession(
      req,
      res,
      authOptions,
    )) as IUserSession;
    return { req, res, prisma, session, t };
  },
});
