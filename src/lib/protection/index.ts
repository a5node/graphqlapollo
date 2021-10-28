'use strict';

import { Express } from 'express';

// Security
import cookieParser from 'cookie-parser';
import hpp from 'hpp';

import compressionMiddleware from './compression.protection';
import expressMiddleware from './express.protection';
import bodyParserMiddleware from './body_parser.protection';
import corsMiddleware from './cors.protection';
//import helmetMiddleware from './helmet.protection';
import { Http500Error } from '../../errors/http-errors';

export default (server: Express): void => {
  try {
    expressMiddleware(server);
    bodyParserMiddleware(server);
    compressionMiddleware(server);

    //For data protection
    corsMiddleware(server);
    // helmetMiddleware(server);

    server.use(cookieParser());
    server.use(hpp());
  } catch (error: Error | any) {
    new Http500Error({ code: 666, message: error.message });
  }
};
