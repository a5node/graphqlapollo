import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongoose';

import User, { TypeUser } from '../user/user.schema';
import Product, { TypeProduct, Products } from '../product/product.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

import { Default } from '../default.schema';
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
  id!: ObjectId;

  @Field()
  where!: string;

  @Field(type => [ID])
  itemId!: ObjectId[];
}

@ObjectType()
export class TypeOrder extends Default {
  @Field(type => ObjectIdScalar)
  customer!: ObjectId;

  @Field(type => [TypeProduct])
  products!: TypeProduct[];

  @Field()
  price!: number;

  @Field()
  paid!: boolean;

  @Field()
  sent!: boolean;

  @Field()
  processed!: boolean;
}

@ObjectType()
export default class Order extends Default {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

  @Field(type => TypeUser)
  customer!: TypeUser;

  @Field(type => [Products])
  products!: Products[];

  @Field()
  price!: number;

  @Field()
  paid!: boolean;

  @Field()
  sent!: boolean;

  @Field()
  processed!: boolean;
}
