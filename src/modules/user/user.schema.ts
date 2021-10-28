'use strict';
import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';

import Order from '../order/order.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@ObjectType()
export default class User {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly id!: string;

  @Field()
  // @Length(3, 30, {
  //   // groups: ['registration'],
  // })
  name!: string;

  @Field()
  // @IsEmail()
  // @Length(5, 70)
  email!: string;

  @Field()
  // @MinLength(5, {
  //   message: (args: ValidationArguments) => {
  //     return 'password is too short';
  //   },
  // })
  password!: string;

  @Field({ nullable: true })
  token!: string;

  @Field(type => [Order], { nullable: true })
  // @IsArray()
  orders!: Order[];

  @Field({ nullable: true })
  // @IsDate()
  create_at!: Date;

  @Field({ nullable: true })
  // @IsDate()
  update_at!: Date;
}

@InputType()
export class UserInput {
  @Field()
  @Length(3, 30)
  name!: String;

  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: String;
}

//  `
// type Order {
//     id: ID!
//     products: [Product!]
//     user: User!
// }

// type Product {
//     id: ID!
//     title: String!
//     price: String!
//     creator: User
//     orders:[Order!]
// }

// type User {
//     id: ID!
//     name: String!
//     email: String!
//     password: String
//     token: String
//     orders: [Order!]
// }

// input InputCreatUser {
//   name: String!
//   email: String!
//   password: String!
// }
// type Test {
//   message: String
// }

// type Query {
//   getUserById(id: ID!): User
//   getAllUsers: [User!]
//   test(root: String!): Test
// }

// type Mutation {
//   createUser(input: InputCreatUser): User
// }

// schema {
//   query : Query
//   mutation : Mutation
// }
// `;
