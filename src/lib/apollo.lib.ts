import 'reflect-metadata';
import type http from 'http';
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
    context: ({ req }) => {
      console.dir(req.token);
      return {
        req,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app, path: config.apolloOptions.path });

  return server;
};

// 'use strict';
// import http from 'http';
// import { GraphQLSchema } from 'graphql';
// import { ObjectId } from 'mongodb';
// import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// import express from 'express';
// import 'reflect-metadata';
// import { buildSchema, NonEmptyArray } from 'type-graphql';

// import { ObjectIdScalar } from './scalar/ObjectId.scalar';
// import env from './config';

//  import { gql } from 'apollo-server';

// class ApollServer {
//   private app!: express.Express;
//   private httpServer!: http.Server;
//   private server!: ApolloServer;
//   private schema!: GraphQLSchema;

//   private resolvers!: NonEmptyArray<string>;
//   private opts!: {
//     path: string;
//   };

//   public get _httpServer(): http.Server {
//     return this.httpServer;
//   }

//   public get servers(): { app: express.Express; httpServer: http.Server; server: ApolloServer } {
//     console.log('server ==>', this.server.graphqlPath);
//     return {
//       app: this.app,
//       httpServer: this.httpServer,
//       server: this.server,
//     };
//   }

//   public set servers(servers: { app: express.Express }) {
//     console.dir('value3');
//     this.app = servers.app;
//   }

//   public set options(options: { path: string }) {
//     this.opts.path = options.path;
//   }
//   public get options(): { path: string } {
//     return { path: this.opts.path };
//   }

//   public async initSchema(resolver: any) {
//     if (this.resolvers) {
//       console.dir('value 2');
//       this.resolvers = [...this.resolvers, resolver];
//     } else {
//       console.dir('value 1');
//       this.resolvers = [resolver];
//     }
//   }
//   public get _resolvers() {
//     return this.resolvers;
//   }

//   public async initApolloServer(): Promise<void> {
//     this.httpServer = http.createServer(this.app);

//     this.schema = await buildSchema({
//       resolvers: this.resolvers,
//       emitSchemaFile: true,
//       dateScalarMode: 'timestamp',
//       scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
//     });

//   const resolvers = {
//     Query: { test: () => {} },
//     Subscription: { test: () => {} },
//     Mutation: { test: () => {} },
//   };

//   const typeDefs = gql`
//     type Query {
//       test(id: ID!): ID
//     }

//     type Mutation {
//       test(id: ID!): ID
//     }

//     type Subscription {
//       test(id: ID!): ID
//     }
//   `;

//     this.server = new ApolloServer({
//       schema: this.schema,
//       apollo: { key: '123456' },
//       plugins: [
//         ApolloServerPluginDrainHttpServer({
//           httpServer: this.httpServer,
//         }),
//         //      ApolloServerPluginSchemaReporting({
//         //   overrideReportedSchema: schema
//         // }),
//       ],
//     });

//     await this.server.start();

//     this.server.applyMiddleware({ app: this.app, path: '/api/graphgl' });

//     console.log(`🚀 Server ready at http://localhost:${env.PORT || 5000}${this.server.graphqlPath}`);
//   }
// }

// export default new ApollServer();
