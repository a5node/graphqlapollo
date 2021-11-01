'use strict';
import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongoose';

import User from '../user/user.schema';
import Product from '../product/product.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@InputType()
export class InputOrderId {
  @Field(type => ID)
  readonly id!: ObjectId;
}

@ObjectType()
export class OrderId {
  @Field(type => ID)
  readonly id!: ObjectId;
}

@InputType()
export class InputCreateOrder {
  @Field(type => ID)
  customer!: ObjectId;

  @Field(type => [ID])
  products!: ObjectId[];

  @Field()
  price!: number;
}

@InputType()
export class InputUpdateOrder {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field({ nullable: true })
  paid?: boolean;

  @Field({ nullable: true })
  sent?: boolean;

  @Field({ nullable: true })
  processed?: boolean;
}

@InputType()
export class InputAddOrRemoveOrder {
  @Field(type => ID)
  orderId!: ObjectId;

  @Field()
  where!: string;

  @Field(type => [ID])
  itemId!: ObjectId[];
}

@ObjectType()
export default class Order {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly id!: ObjectId;

  @Field(type => ObjectIdScalar, { nullable: true })
  readonly _id!: ObjectId;

  @Field(type => User)
  customer!: User;

  @Field(type => [Product])
  products!: Product[];

  @Field()
  price!: number;

  @Field()
  paid!: boolean;

  @Field()
  sent!: boolean;

  @Field()
  processed!: boolean;
}
