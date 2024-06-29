import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { prisma } from '../../../prisma/db'
import type { Context } from '@app/backend/config/database/config';
import { typeDefs } from '@app/backend/graphql/schemas';
import { resolvers } from '@app/backend/graphql/resolvers';
import type { NextRequest } from 'next/server';


const server = new ApolloServer<Context>({
    resolvers,
    typeDefs,
});

export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({ req, res, prisma })
});