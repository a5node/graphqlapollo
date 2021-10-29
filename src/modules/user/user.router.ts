import { Router } from 'express';

// import { graphqlHTTP } from 'express-graphql';
// import schema from './user.schema';
// import UserServers from './user.resolvers';
import UserResolver from './user.resolvers';
import ApollServer from '../../lib/builder.schem';

const router: Router = Router();

// router.use(
//   '/',
//   graphqlHTTP({
//     schema,
//     rootValue: UserServers,
//     graphiql: true,
//   }),
// );

ApollServer.initResolvers(UserResolver);

export default router;
