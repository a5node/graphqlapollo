import Server from '../../src';
import supertest from 'supertest';

const server = Server._app;

const graphQLRequest = (query: string) => {
  return supertest(server).post('/graphql').send({
    query,
  });
};

export default graphQLRequest;
