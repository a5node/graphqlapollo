'use strict';
import express from 'express';
import helmet from 'helmet';

//https://www.npmjs.com/package/helmet

//helmet option
const option = {};

export default (server: express.Express): void => {
  server.use(helmet(option));
};
