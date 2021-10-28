'use strict';

import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './auth.schema';
import AuthService from './auth.servers';

const router: Router = Router();

router.use('/', graphqlHTTP({ schema, rootValue: AuthService, graphiql: true }));

export default router;
