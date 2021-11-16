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

import { GraphQLSchema, printSchema } from 'graphql';
import config from '../config';
import Builder from './builder.schema';
import authServers from '../modules/auth/auth.servers';
import { HttpApolloErrors, MyError } from '../errors/http-errors';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';

export default async (app: Express, httpServer: http.Server): Promise<ApolloServer<ExpressContext>> => {
  const schema: GraphQLSchema = await Builder.initSchema();

  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production',
    context: async ({ req, res }: { req: Request; res: Response }) => {
      const user = await authServers.auth(req);

      if (user.id) {
        req.headers.sessionId = user.id;
      }

      return { req, user, res };
    },

    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
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
      console.dir(err);
      if (err.message?.startsWith('Database Error: ')) {
        throw new MyError('My error message');
      }

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

//rover graph introspect   http://localhost:3307/api/graphql --header="APOLLO_KEY:service:iO4z3C-2j3JHEUC8BIP1eQ:6P3sWMSR0N51rx6RzH9fPg" --header="APOLLO_USER:iO4z3C-2j3JHEUC8BIP1eQ" --header="Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODM5YjUyNmUxZTQ0NjZlZWYwNDJlNSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJpYXQiOjE2MzcwNTY3MzcsImV4cCI6MTYzNzY2MTUzN30.LLqM4dw5Fa9gU4FrtUo1q6KoBOjuSdYH_niUx437rLE" --header="Access-Control-Allow-Credentials: true" --header="Access-Control-Allow-Origin: https://studio.apollographql.com"|   rover graph publish iO4z3C-2j3JHEUC8BIP1eQ@current --schema -
//rover graph introspect   https://a5node-graphql-apollo.herokuapp.com/api/graphql --header="APOLLO_KEY:service:iO4z3C-2j3JHEUC8BIP1eQ:6P3sWMSR0N51rx6RzH9fPg" --header="APOLLO_USER:iO4z3C-2j3JHEUC8BIP1eQ" --header="Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODM5YjUyNmUxZTQ0NjZlZWYwNDJlNSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJpYXQiOjE2MzcwNTY3MzcsImV4cCI6MTYzNzY2MTUzN30.LLqM4dw5Fa9gU4FrtUo1q6KoBOjuSdYH_niUx437rLE" --header="Access-Control-Allow-Credentials: true" --header="Access-Control-Allow-Origin: https://studio.apollographql.com"|   rover graph publish iO4z3C-2j3JHEUC8BIP1eQ@current --schema -
