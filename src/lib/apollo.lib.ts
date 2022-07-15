import 'reflect-metadata';
import type http from 'http';

import { Express, Request, Response } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginCacheControl,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginSchemaReporting,
} from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';

import config from '../config';
import Builder from './builder.schema';
import authServers from '../modules/auth/auth.servers';
import { HttpApolloErrors, MyError } from '../errors/http-errors';

export default async (app: Express, httpServer: http.Server): Promise<ApolloServer<ExpressContext>> => {
  const schema: GraphQLSchema = await Builder.initSchema();

  const server = new ApolloServer({
    schema,
    // introspection: process.env.NODE_ENV !== 'production',
    context: async ({ req, res }: { req: Request; res: Response }) => {
      const user = await authServers.auth(req);

      if (user.id) {
        req.headers.sessionId = user.id;
      }

      return { req, user, res };
    },

    plugins: [
      ApolloServerPluginSchemaReporting(),
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
      ApolloServerPluginCacheControl({
        defaultMaxAge: 5,
      }),
      responseCachePlugin({
        sessionId: requestContext => {
          return requestContext.context.user.id || null;
        },
      }),
    ],
    apollo: {
      key: config.apolloKey,
      graphVariant: 'current',
      graphId: config.apolloId,
    },
    formatError: err => {
      if (err.message?.startsWith('Database Error: ')) {
        throw new MyError('My error message');
      }
      console.dir(err);
      return new HttpApolloErrors({ code: 1 }).json(err);
    },
    formatResponse: (res, req) => {
      return res;
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: config.apolloOptions.path,
    bodyParserConfig: true,
    cors: {
      credentials: true,
      origin: (origin, callback) => {
        callback(null, true);
      },
    },
  });

  return server;
};
