import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, MinLength, IsNumber, IsString, IsBoolean } from 'class-validator';

import { ObjectId } from 'mongoose';

import User, { Creator } from '../user/user.schema';
import { Default } from '../default.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@InputType()
export class InputProductId {
  @Field(type => ID)
  @IsString()
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
  @IsNumber()
  price!: number;

  @Field()
  @Length(1, 30)
  @IsString()
  title!: string;

  @Field()
  @MinLength(10)
  @IsString()
  content!: string;

  @Field()
  @IsNumber()
  amount!: number;

  @Field()
  creator!: string;
}

@InputType()
export class InputUpdateProduct {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field({ nullable: true })
  @IsNumber()
  price!: number;

  @Field({ nullable: true })
  @Length(1, 30)
  @IsString()
  title!: string;

  @Field({ nullable: true })
  @MinLength(10)
  @IsString()
  content!: string;

  @Field({ nullable: true })
  @IsNumber()
  amount!: number;

  @Field()
  @IsBoolean()
  isRemove!: boolean;
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
export class UpdateProduct extends ProductDefault {
  @Field(type => Creator)
  creator!: Creator;
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
