import 'reflect-metadata';
import type http from 'http';
import path from 'path';
import { Express } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';
import config from '../config';
import Builder from './builder.schem';

export default async (app: Express, httpServer: http.Server): Promise<ApolloServer<ExpressContext>> => {
  const schema: GraphQLSchema = await Builder.initSchema();
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      const { apollo_user, apollo_key } = req.headers;

      if (apollo_key !== config.apolloKey) {
        throw new Error();
      }

      if (!config.apolloUsers.split(' ').includes(apollo_user as string)) {
        throw new Error();
      }

      console.dir(`User connect ${apollo_user}`);

      return {
        req,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
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
