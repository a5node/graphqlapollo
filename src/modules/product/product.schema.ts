'use strict';
import { Field, ObjectType } from 'type-graphql';
import 'reflect-metadata';
import User from '../user/user.schema';
import Order from '../order/order.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@ObjectType()
export default class Product {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly id!: string;

  @Field()
  price!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(type => User)
  creator!: User;

  @Field(type => [Order])
  orders!: Order[];
}

// `
// type Order {
//     _id: ID!
//     products: [Product!]
//     user: User!
// }

// type Product {
//     _id: ID!
//     title: String!
//     price: String!
//     orders:[Order!]
//     creator: User
// }

// type User {
//     _id: ID!
//     name: String!
//     email: String!
//     password: String
//     orders: [Order!]
// }

// type RootQuery {
//     user: [User!]!
//     product: [Order!]!
//     order: [Product!]!
// }

// schema {
//     query: RootQuery
// }

// `;
