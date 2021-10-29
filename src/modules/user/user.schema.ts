import 'reflect-metadata';
import { Arg, Field, ObjectType, InputType, ID, ArgsType, InterfaceType } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';

import Order from '../order/order.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@ObjectType()
export class Default {
  @Field({ nullable: true })
  @IsDate()
  readonly create_at!: Date;

  @Field({ nullable: true })
  @IsDate()
  readonly update_at!: Date;
}

@InterfaceType()
abstract class UserName {
  @Field()
  @Length(3, 30, {
    groups: ['registration'],
  })
  name!: string;
}

@InterfaceType()
abstract class UserEmail {
  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;
}

@InterfaceType()
abstract class UserPassword {
  @Field()
  @MinLength(5, {
    message: (args: ValidationArguments) => {
      return 'password is too short';
    },
  })
  password!: string;
}

@ObjectType()
export class UserAccessToken {
  @Field({ nullable: true })
  access_token!: string;
}

@ObjectType()
export default class User extends Default {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly id!: string;

  @Field()
  @Length(3, 30, {
    groups: ['registration'],
  })
  name!: string;

  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;

  @Field()
  @MinLength(4, {
    message: (args: ValidationArguments) => {
      return 'password is too short';
    },
  })
  password!: string;

  @Field({ nullable: true })
  access_token!: string;

  @Field(type => [Order], { nullable: true })
  @IsArray()
  orders!: Order[];
}

@ObjectType()
export class CreateUser extends Default {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly id!: string;

  @Field()
  @Length(3, 30)
  name!: string;

  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;

  @Field({ nullable: true })
  access_token!: string;
}

@InputType()
export class InputCreateUser {
  @Field()
  @Length(3, 30)
  name!: string;

  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;

  @Field()
  @MinLength(4, {
    message: (args: ValidationArguments) => {
      return 'password is too short';
    },
  })
  password!: string;
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
