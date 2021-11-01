import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongoose';

import Order from '../order/order.schema';
import { IOrderSchema } from '../order/order.interface';

@ObjectType()
export class Default {
  @Field({ nullable: true })
  @IsDate()
  readonly create_at!: Date;

  @Field({ nullable: true })
  @IsDate()
  readonly update_at!: Date;
}

@ObjectType()
export class UserId {
  @Field(type => ID)
  readonly id!: ObjectId;
}

@InputType()
export class InputUserId {
  @Field(type => ID)
  readonly id!: ObjectId;
}

@ObjectType()
export class UserName {
  @Field()
  @Length(3, 30, {
    groups: ['registration'],
  })
  name!: string;
}

@InputType()
export class InputUserEmail {
  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;
}

@ObjectType()
export class UserEmail {
  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;
}

@ObjectType()
export class UserPassword {
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
export class CreateUser extends Default {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

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

@InputType()
export class InputFindUser {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

  @Field({ nullable: true })
  @IsEmail()
  @Length(5, 70)
  email!: string;
}

@ObjectType()
export class FindUser extends Default {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

  @Field()
  @Length(3, 30, {
    groups: ['registration'],
  })
  name!: string;

  @Field()
  @IsEmail()
  @Length(5, 70)
  email!: string;

  @Field({ nullable: true })
  access_token!: string;

  @Field(type => [Order], { nullable: true })
  @IsArray()
  orders!: Order[] | IOrderSchema[] | ObjectId[] | string[];
}

@ObjectType()
export default class User extends Default {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

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
