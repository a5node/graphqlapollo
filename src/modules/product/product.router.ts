import { Router } from 'express';

import ProductResolver from './product.resolvers';
import Builder from '../../lib/builder.schema';

//Building schema for apollo-graphql.
Builder.initResolvers(ProductResolver);

const router: Router = Router();

export default router;
