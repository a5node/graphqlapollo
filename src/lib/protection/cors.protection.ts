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
};

export default (server: express.Express): void => {
  server.use(cors(option));
};
