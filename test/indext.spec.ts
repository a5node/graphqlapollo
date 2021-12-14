// import { expect, jest, test, describe, it, beforeEach, afterAll, afterEach, beforeAll } from '@jest/globals';
// import UserModel from '../src/modules/user/user.model';
// import graphQLRequest from './utils/graphRequest';

// const mutation = (data: string) => `mutation { ${data} }`;
// const query = (data: string) => `query { ${data} }`;

// describe('Acceptance tests GraphQl request', () => {
//   let res: any;
//   let token: any;
//   beforeEach(async () => {
//     res = await graphQLRequest('');
//   });
//   describe('Acceptance tests User', () => {
//     let user: any;

//     it('should be created user', async () => {
//       const req = `createUser( data: { name:"test", email:"test_test@test.com", password:"test"}) { _id, roles, name }`;
//       const res = await graphQLRequest(mutation(req));
//       const { body } = res;
//       const { data } = body;
//       const { createUser } = await data;
//       expect(res.status).not.toBe(404);
//       expect(createUser).toBeDefined();
//       user = { ...createUser };
//     });

//     it('should be user.name = test', async () => {
//       expect(user).toHaveProperty('name', 'test');
//     });
//     it('should be user.roles = ["USER"]', async () => {
//       expect(user).toHaveProperty('roles', ['USER']);
//     });
//     it('should be user remove', async () => {
//       const { _id } = await user;
//       const { deletedCount } = await UserModel.deleteOne({ _id: _id }).exec();
//       expect(deletedCount).toBe(1);
//     });
//     it('should be user not found and equals null', async () => {
//       const { _id } = await user;
//       const findUser = await UserModel.findOne({ _id: _id });
//       expect(findUser).toBeNull();
//     });
//   });
//   describe('Acceptance tests func login', () => {
//     let res: any;
//     let user: any;

//     beforeEach(async () => {
//       const req = `login ( data: {  email:"test@test.com", password:"test"}) {_id , name, access_token , orders { _id } }`;
//       res = await graphQLRequest(query(req));
//     });
//     it('should be login and status 200!', async () => {
//       // const req = `login ( data: {  email:"test@test.com", password:"test"}) {_id , name, access_token , orders { _id } }`;
//       // const res = await graphQLRequest(query(req));

//       const { status } = await res;
//       expect(status).toBe(200);
//     });

//     it('should be find func login', async () => {
//       const { login } = await res.body.data;
//       expect(login).toBeDefined();
//     });

//     it('should be find and validly access_token!', async () => {
//       const { login } = await res.body.data;
//       expect(login).toHaveProperty('access_token');
//       expect(login).not.toBeNull();
//       const { access_token, _id } = login;
//       token = access_token;

//       expect(access_token.lenth).toBeGreaterThan(10);
//       expect(_id.lenth).toBeGreaterThan(6);

//       user = { ...user, ...login };
//     });
//   });

//   // it('should test graphQl structure by printing hello world!', async () => {
//   //   const helloWorld = await graphQLRequest(`query { helloWorld }`);
//   //   expect(helloWorld.body.data.helloWorld).toBe('👋 Hello world! 👋');
//   // });
// });
