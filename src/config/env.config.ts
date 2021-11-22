'use strict';

import { EnvConfig } from './config.interface';

const env: EnvConfig = {
  appKey: process.env.APP_KEY || '123456',
  PORT: process.env.PORT || 3307,
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017',

  DATABASE_NAME: process.env.DATABASE_NAME || 'a5_node',
  HOST: process.env.HOST || 'localhost',
  CORS: process.env.CORS || '*',
  apolloKey: process.env.APOLLO_KEY || '',
  apolloKeys: process.env.APOLLO_KEYS || '',
  apolloId: process.env.APOLLO_GRAPH_ID || '',
  apolloUsers: process.env.APOLLO_USERS || '',
  NODE_ENV: process.env.NODE_ENV || '',
};

export default env;
