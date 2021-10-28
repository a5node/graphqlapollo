'use strict';

import { Router } from 'express';
// import { graphqlHTTP } from 'express-graphql';

// import schema from './product.schema';
// import ProductServers from './product.servers';
import ProductResolver from './product.resolvers';
import ApollServer from '../../lib/builder.schem';

const router: Router = Router();

// router.use('/', graphqlHTTP({ schema, rootValue: ProductServers, graphiql: true }));

// router.use(
//   '/',
//   graphqlHTTP({
//     schema,
//     rootValue: UserServers,
//     graphiql: true,
//   }),
// );

ApollServer.initResolvers(ProductResolver);
export default router;
