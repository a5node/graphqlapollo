import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongoose';

import User from '../user/user.schema';

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

@ObjectType()
export class CreateProduct {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field()
  price!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(type => ID)
  creator!: ObjectId;
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
  creator!: string;
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

  @Field(type => User)
  creator!: User;
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
}

@ObjectType()
export default class Product {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field()
  price!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(type => User)
  creator!: User;

  @Field({ nullable: true })
  @IsDate()
  readonly create_at!: Date;

  @Field({ nullable: true })
  @IsDate()
  readonly update_at!: Date;
}
