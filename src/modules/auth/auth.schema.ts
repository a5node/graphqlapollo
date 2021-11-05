import 'reflect-metadata';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Length, IsArray, IsEmail, MinLength, IsDate, ValidationArguments } from 'class-validator';

@InputType()
export class InputLogin {
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

@ObjectType()
export default class Auth {
  @Field({ nullable: true })
  access_token!: string;

  @Field({ nullable: true })
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
