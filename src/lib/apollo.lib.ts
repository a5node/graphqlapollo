import 'reflect-metadata';
import type http from 'http';

import { Express, Request, Response } from 'express';

import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginCacheControl } from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import { GraphQLSchema } from 'graphql';
import config from '../config';
import Builder from './builder.schema';
import authServers from '../modules/auth/auth.servers';
import cors from 'cors';

export default async (app: Express, httpServer: http.Server): Promise<ApolloServer<ExpressContext>> => {
  const schema: GraphQLSchema = await Builder.initSchema();

  const server = new ApolloServer({
    schema,

    context: async ({ req, res }: { req: Request; res: Response }) => {
      const user = await authServers.auth(req);

      return {
        req,
        user,
        res,
      };
    },

    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
      ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
      responseCachePlugin({
        sessionId: requestContext => {
          return requestContext.context.user.id || null;
        },
      }),
    ],
    apollo: {
      key: config.apolloKey,
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: config.apolloOptions.path });

  return server;
};
