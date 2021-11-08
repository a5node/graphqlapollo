'use strict';

import express, { Express, RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import bearerTokenMiddleware from 'express-bearer-token';
import mongoSanitize from 'express-mongo-sanitize';

import config from '../../config';

const staticFileMiddleware: RequestHandler = express.static(config.staticClient);
// Access-Control-Allow-Origin: https://studio.apollographql.com
// Access-Control-Allow-Credentials: true
export default (server: Express): void => {
  server.disable('x-powered-by');
  server.enable('trust proxy');

  server.use(express.urlencoded());
  server.use(express.json());
  server.use(staticFileMiddleware);
  server.use(bearerTokenMiddleware(config.bearerToken));
  //Used for limit repeated requests
  server.use(rateLimit(config.reteLimit));
  server.use(mongoSanitize());
};
