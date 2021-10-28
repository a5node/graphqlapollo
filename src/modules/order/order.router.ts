'use strict';

import { Router } from 'express';
// import { graphqlHTTP } from 'express-graphql';

import ApollServer from '../../lib/builder.schem';

// import schema from './order.schema';
// import OrderServers from './order.servers';
import OrderResolver from './order.resolvers';

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

ApollServer.initResolvers(OrderResolver);
export default router;
