'use strict';

import { Router } from 'express';

import AuthResolvers from './auth.resolvers';
import AuthService from './auth.servers';
import Builder from '../../lib/builder.schema';

Builder.authChecker(AuthService.authChecker);
Builder.initResolvers(AuthResolvers);

const router: Router = Router();

export default router;
