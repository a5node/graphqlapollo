import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongoose';

import Order, { TypeOrder } from '../order/order.schema';
import { Default } from '../default.schema';
import { Role } from '../../interface';
import { IAddOrRemove, IInputCreateUser, IInputFindUser, IInputUpdateUser, IAddOrRemoveRole } from '../../interface';

@InputType()
export class InputCreateUser implements IInputCreateUser {
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
export class InputAddOrRemoveUser implements IAddOrRemove {
  @Field(type => ID)
  id!: ObjectId;

  @Field()
  where!: string;

  @Field(type => [ID])
  itemId!: ObjectId[];
}

@InputType()
export class InputFindUser implements IInputFindUser {
  @Field(type => ID, { nullable: true })
  readonly id!: ObjectId;

  @Field({ nullable: true })
  @IsEmail()
  @Length(5, 70)
  email!: string;
}

@InputType()
export class InputUpdateUser implements IInputUpdateUser {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  email!: string;
}

@InputType()
export class InputAddOrRemoveRoleUser implements IAddOrRemoveRole {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field(type => Role, { nullable: true })
  role!: Role;
}

@ObjectType()
export class UserDefault extends Default {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field(type => [Role])
  roles!: Role[];
}

@ObjectType()
export class CreateUser extends UserDefault {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field()
  access_token!: string;
}

@ObjectType()
export class TypeUser extends UserDefault {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field(type => [String])
  orders!: ObjectId[] | string[];
}

@ObjectType()
export class Creator extends UserDefault {}

@ObjectType()
export class Customer extends UserDefault {
  @Field(type => [String], { nullable: true })
  orders!: ObjectId[] | string[];
}

@ObjectType()
export class FindUser extends UserDefault {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field()
  access_token!: string;

  @Field(type => [TypeOrder])
  orders!: TypeOrder[];
}

@ObjectType()
export default class User extends UserDefault {
  @Field(type => ID)
  readonly id!: ObjectId;

  @Field()
  access_token!: string;

  @Field(type => [TypeOrder])
  orders!: TypeOrder[];
}
