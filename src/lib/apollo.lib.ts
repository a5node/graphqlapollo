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
import { HttpApolloErrors } from '../errors/http-errors';

export default async (app: Express, httpServer: http.Server): Promise<ApolloServer<ExpressContext>> => {
  const schema: GraphQLSchema = await Builder.initSchema();

  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production',
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
      ApolloServerPluginCacheControl({
        defaultMaxAge: 1000,
      }),
      responseCachePlugin({
        sessionId: requestContext => {
          return requestContext.context.user.id || null;
        },
      }),
    ],
    apollo: {
      key: config.apolloKeys,
    },
    formatError: err => {
      // Don't give the specific errors to the client.
      // if (err.message.startsWith('Database Error: ')) {
      //   return new Error('Internal server error');
      // }

      console.dir(err);
      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.

      return new HttpApolloErrors({ code: 1 }).json(err);
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: config.apolloOptions.path,
    cors: {
      credentials: true,
      origin: (origin, callback) => {
        callback(null, true);
      },
    },
  });

  return server;
};
