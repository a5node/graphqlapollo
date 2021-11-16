import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { IsArray, IsNumber, IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';

import { TypeUser } from '../user/user.schema';
import { TypeProduct, Products } from '../product/product.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

import { Default, InputFilter } from '../default.schema';
import { SchemaDB } from '../../interface/enum.interface';

@InputType()
export class InputOrderId {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field(type => InputFilter, { nullable: true })
  filter!: InputFilter;
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
  @IsArray()
  products!: ObjectId[];

  @Field()
  @IsNumber()
  price!: number;
}

@InputType()
export class InputUpdateOrder {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field({ nullable: true })
  @IsBoolean()
  paid?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  sent?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  received!: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  isRemove!: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  processed?: boolean;
}

@InputType()
export class InputAddOrRemoveOrder {
  @Field(type => ID)
  id!: ObjectId;

  @Field(type => SchemaDB)
  where!: SchemaDB;

  @Field(type => [ID])
  itemId!: ObjectId[];
}

@ObjectType()
export class OrderDefault extends Default {
  @Field()
  price!: number;

  @Field()
  paid!: boolean;

  @Field()
  sent!: boolean;

  @Field()
  received!: boolean;

  @Field()
  processed!: boolean;

  @Field()
  isRemove!: boolean;
}

@ObjectType()
export class TypeOrder extends OrderDefault {
  @Field(type => ObjectIdScalar)
  customer!: ObjectId;

  @Field(type => [TypeProduct])
  products!: TypeProduct[];
}

@ObjectType()
export default class Order extends OrderDefault {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

  @Field(type => TypeUser)
  customer!: TypeUser;

  @Field(type => [Products])
  products!: Products[];
}
