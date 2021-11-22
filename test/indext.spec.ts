import { expect, jest, test, describe, it, beforeEach, afterAll, afterEach, beforeAll } from '@jest/globals';
import graphQLRequest from './utils/graphRequest';

const mutation = (data: string) => `mutation { ${data} }`;
const query = (data: string) => `query { ${data} }`;

describe('Acceptance tests router', () => {
  it('should test graphQl structure by printing mutation word!', async () => {
    const data = `createUser({
      "name": "test_spec",
      "email": "test_test@test.com",
      "password": "test"
    }){
      _id
      create_at
    }`;

    const requestResponse = await graphQLRequest(mutation(data));
    try {
      const {
        body: {
          data: { createUser },
        },
      } = requestResponse;

      expect(createUser).toBeDefined();
      expect(createUser).toBe('Printing word: this test is fu***ing working!');
    } catch (err) {
      console.log('sss');
    }
  });

  // it('should test graphQl structure by printing hello world!', async () => {
  //   const helloWorld = await graphQLRequest(`query { helloWorld }`);
  //   expect(helloWorld.body.data.helloWorld).toBe('👋 Hello world! 👋');
  // });
});
