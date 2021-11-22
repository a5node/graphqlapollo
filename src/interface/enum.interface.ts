import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum DB {
  USER = 'user',
  USERS = 'users',
  ORDER = 'order',
  ORDERS = 'orders',
  PRODUCT = 'product',
  PRODUCTS = 'products',
  CREATOR = 'creator',
  CUSTOMER = 'customer',
  ROLES = 'roles',
}

export enum SchemaDB {
  ORDERS = 'orders',
  PRODUCTS = 'products',
  CREATOR = 'creator',
  CUSTOMER = 'customer',
  ROLES = 'roles',
}

export enum ESortDB {
  //  сортировать по убыванию (-1 ,desc ,descending )
  //  сортировать по возрастанию (1 , asc ,ascending)
  asc = 'asc',
  desc = 'desc',
  ascending = 'ascending',
  descending = 'descending',
  once = 1,
  minusOnce = -1,
}

registerEnumType(ESortDB, {
  name: 'ESortDB',
  description: 'The basic sort for db',
});

registerEnumType(SchemaDB, {
  name: 'SchemaDB',
  description: 'The basic schema for db',
});

registerEnumType(Role, {
  name: 'Role',
  description: 'The basic roles for users',
});
