import { Router } from 'express';

import UserResolver from './user.resolvers';
import Builder from '../../lib/builder.schema';

//Building schema for apollo-graphql.
Builder.initResolvers(UserResolver);

const router: Router = Router();

export default router;
