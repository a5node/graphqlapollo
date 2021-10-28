'use strick';

import http from 'http';

//app server
import express from 'express';
import logger from 'morgan';

//DataBase
import connectMongoDB from './db';
//Config
import env from './config';
//Router
import router from './routers';
import middleware from './middlewares';
import initApollo from './lib/apollo.lib';
//Error handler
import error from './errors';

export default class Server {
  private app!: express.Express;
  private httpServer!: http.Server;

  constructor() {}

  public async start(): Promise<void> {
    await this.initServer();

    this.initDB();
    this.initLogger();
    this.initMiddleware();
    this.initRoutes();

    return this.startListening();
  }

  private async initServer() {
    // Create express server
    this.app = express();
    this.httpServer = http.createServer(this.app);

    const apollo = await initApollo(this.app, this.httpServer);

    console.log(`🚀 Server ready at http://localhost:${env.PORT || 5000}${apollo.graphqlPath}`);
  }

  private initLogger() {
    // If development mode in console is not writing messages about logs
    if (env.NODE_DEV === 'dev') {
      this.app.use(logger('dev'));
    }
  }

  private initMiddleware() {
    //The data protection
    middleware(this.app);
    //Middleware  for handling errors
    error(this.app);
  }

  //Adding routers to express server
  private initRoutes() {
    router(this.app);
  }

  //Connect dataBase
  private initDB() {
    try {
      connectMongoDB();
    } catch (error) {
      process.exit(1);
    }
  }

  private async startListening(): Promise<void> {
    try {
      await new Promise<http.Server>(resolve =>
        resolve(
          this.httpServer.listen({ port: env.PORT || 5000 }, () => {
            console.log('\x1b[33m%s\x1b[0m', `Server started on port : ${env.PORT || 5000}`);
          }),
        ),
      );
    } catch (error) {
      // Close server & exit process
      process.on('unhandledRejection', async (err: Error) => {
        console.log('\x1b[31m%s\x1b[0m', `Error: ${err.message}`);

        this.httpServer.close(() => process.exit(1));
      });
    }
  }
}

new Server().start();

// import { gql } from 'apollo-server';
// import { ApolloServer } from 'apollo-server-express';

// const test = (app: express.Express) => {
//   app.use((req, res, next) => {
//     console.log('Time:---->', Date.now());
//     next();
//   });
// };

// const server = async () => {
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

//   const app = express();
//   const httpServer = http.createServer(app);

//   middleware(app);
//   error(app);
//   connectMongoDB();
//   router(app);

//   const port = 3307;
//   httpServer.listen(port, () => {
//     console.log(` Server ready at http://localhost:${port}${server.graphqlPath}`);
//   });

//   const server = new ApolloServer({
//     typeDefs: [typeDefs],
//     resolvers: [resolvers],
//   });

//   await server.start();

//   server.applyMiddleware({ app });
// };

// server();
