'use strict';
import express from 'express';
import cors from 'cors';

import config from '../../config';

//Cors option
const option = {
  origin: (config.CORS || '*').split(' ').map(host => {
    return new RegExp(host);
  }),
  credentials: true,
  optionsSuccessStatus: 200,
  allRoutes: true,
  allowOrigins: '*',
  allowCredentials: false,
  allowRequestHeaders: 'content-type, authorization',
};

export default (server: express.Express): void => {
  server.use(cors(option));
};
