import { Router } from 'express';

import Builder from '../../lib/builder.schema';
import OrderResolver from './order.resolvers';

//Building schema for apollo-graphql.
Builder.initResolvers(OrderResolver);

const router: Router = Router();

export default router;
