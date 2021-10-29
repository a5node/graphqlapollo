'use strick';

import http from 'http';

//app server
import express from 'express';
import logger from 'morgan';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
//DataBase
import connectMongoDB from './db';
//Config
import config from './config';
//Router
import router from './routers';
import middleware from './middlewares';
import initApollo from './lib/apollo.lib';
//Error handler
import error from './errors';

export default class Server {
  private app!: express.Express;
  private httpServer!: http.Server;
  private apollo!: ApolloServer<ExpressContext>;

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
    this.apollo = await initApollo(this.app, this.httpServer);
  }

  private initLogger() {
    // If development mode in console is not writing messages about logs
    if (config.NODE_DEV === 'dev') {
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

  private startListening(): void {
    try {
      this.httpServer.listen({ port: config.PORT || 5000 }, () => {
        console.log(`🚀 Server ready at http://localhost:${config.PORT || 5000}${this.apollo.graphqlPath}`);
        console.log('\x1b[33m%s\x1b[0m', `Server started on port : ${config.PORT || 5000}`);
      });
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
