import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';

@InputType()
export class InputLogin {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export default class Auth {
  @Field({ nullable: true })
  access_token!: string;

  @Field({ nullable: true })
  email!: string;

  @Field()
  password!: string;
}
