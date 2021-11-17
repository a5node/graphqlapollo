import { registerEnumType } from 'type-graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The basic roles for users',
});

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

registerEnumType(SchemaDB, {
  name: 'SchemaDB',
  description: 'The basic schema for db',
});

export enum ESortDB {
  FALSE = 1, // -1  - от большого к меньшему
  TRUE = -1, //  1  - от меньшего к большему
  NOTHING = 0, //  0  - ничего не делать
}
