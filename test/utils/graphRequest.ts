// import Server from '../../src';
// import config from '../../src/config';
// import { default as request } from 'supertest';

// const server = Server._httpServer;

// const header = { APOLLO_KEY: `${config.apolloKey}`, APOLLO_USER: `${config.apolloId}`, Accept: 'application/json' };

// const graphQLRequest = async (data: string, token?: string) => {
//   return await request(server)
//     .post(`${config.apolloOptions.path}`)
//     .send({
//       query: data,
//     })
//     .set({ ...header, Authorization: `${token}`, headers: { ...header, Authorization: `${token}` } });
// };

// export default graphQLRequest;
