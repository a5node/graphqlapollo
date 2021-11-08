'use strict';
import express from 'express';
import cors from 'cors';

import config from '../../config';

//Cors option
const option = {
  origin: (config.CORS || '*').split(' ').map(host => {
    // 'http://localhost:3307',
    //       'http://a5node-graphql-apollo.herokuapp.com',
    //       'https://a5node-graphql-apollo.herokuapp.com',
    //       'https://studio.apollographql.com/sandbox/explorer'

    console.dir(new RegExp(host));

    return new RegExp(host);
  }),
  credentials: true,
  optionsSuccessStatus: 200,
};

export default (server: express.Express): void => {
  server.use(cors(option));
};
