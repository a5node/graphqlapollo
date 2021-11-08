'use strict';
import path from 'path';
import { OptionConfig } from './config.interface';

const options: OptionConfig = {
  jwtOptions: {
    expiresIn: '7d',
  },

  staticClient: path.join(__dirname, '../../client'),
  bearerToken: {
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
  },
  reteLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // limit each IP to 100 requests per windowMs
  },
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  },
  apolloOptions: {
    path: '/api/graphql',
  },
};

export default options;
