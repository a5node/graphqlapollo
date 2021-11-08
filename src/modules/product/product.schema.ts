import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongoose';

import User, { Creator } from '../user/user.schema';
import { Default } from '../default.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@InputType()
export class InputProductId {
  @Field(type => ID)
  readonly id!: ObjectId;
}

@ObjectType()
export class ProductId {
  @Field(type => ID)
  readonly id!: ObjectId;
}

@InputType()
export class InputCreateProduct {
  @Field()
  price!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  amount!: number;

  @Field()
  creator!: string;
}

@InputType()
export class InputUpdateProduct {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field({ nullable: true })
  price!: number;

  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  content!: string;

  @Field({ nullable: true })
  amount!: number;
}

@ObjectType()
export class UpdateProduct {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field()
  price!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  amount!: number;

  @Field()
  isRemove!: boolean;

  @Field(type => User)
  creator!: User;
}

@ObjectType()
export class ProductDefault extends Default {
  @Field()
  price!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  amount!: number;

  @Field()
  isRemove!: boolean;
}

@ObjectType()
export class CreateProduct extends ProductDefault {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field(type => ID)
  creator!: ObjectId;
}

@ObjectType()
export class TypeProduct extends ProductDefault {
  @Field(type => ObjectIdScalar)
  creator!: ObjectId;
}

@ObjectType()
export class Products extends ProductDefault {
  @Field(type => Creator)
  creator!: Creator;
}

@ObjectType()
export default class Product extends ProductDefault {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field(type => User)
  creator!: User;
}
