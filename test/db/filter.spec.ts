// import { expect, jest, test, describe, it, beforeEach, afterAll, afterEach, beforeAll } from '@jest/globals';

// import { filterDB, sortDB, priceDB, selectDB } from '../../src/db/filter.db';
// import { IComposer } from '../../src/interface';
// import { ReturnPrice, ReturnSort } from './dbClassForTest';

// describe('Functions for filtration data', () => {
//   const data = {
//     skip: 1,
//     limit: 10,
//     sort: new ReturnSort({ price: 1 }),
//     price: new ReturnPrice({
//       from: 10,
//       to: 15,
//     }),
//   };

//   const returnDataTrue: IComposer = {
//     skip: 10,
//     limit: 10,
//     sort: {
//       price: 1,
//     },
//     price: {
//       price: {
//         $gte: 10,
//         $lte: 15,
//       },
//     },
//   };

//   describe('Check function filterDB', () => {
//     it('should be defined filterDB', () => {
//       expect(filterDB(data)).toBeDefined();
//     });

//     it('should be return true ', () => {
//       expect(filterDB(data)).toEqual(returnDataTrue);
//     });
//   });

//   describe('Check function selectDB', () => {
//     const select = {
//       skip: 10,
//       limit: 10,
//     };

//     it('should be defined selectDB', () => {
//       expect(selectDB(data)).toBeDefined();
//     });

//     it('should be return return true', () => {
//       expect(selectDB(data)).toEqual(select);
//       expect(selectDB({ skip: 5 })).toEqual({ skip: 5, limit: 0 });
//       expect(selectDB({ limit: 5 })).toEqual({ skip: 0, limit: 5 });
//       expect(selectDB({ limit: undefined, skip: undefined })).toEqual({ skip: 0, limit: 0 });
//     });
//   });

//   describe('Check function sortDB', () => {
//     it('should be defined sortDB', () => {
//       expect(sortDB(data)).toBeDefined();
//     });

//     it('should be return return true', () => {
//       expect(sortDB(data)).toEqual(returnDataTrue.sort);
//     });

//     it('should be return default value', () => {
//       const r = { create_at: -1 };
//       expect(sortDB({})).toEqual(r);
//     });
//   });

//   describe('Check function priceDB', () => {
//     it('should be defined priceDB', () => {
//       expect(priceDB(data)).toBeDefined();
//     });

//     it('should be return return true', () => {
//       expect(priceDB(data)).toEqual(returnDataTrue.price);
//     });

//     it('should be return default value', () => {
//       const r = {};
//       const data = {};
//       expect(priceDB(data)).toEqual(r);
//     });
//   });
// });
