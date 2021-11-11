import 'reflect-metadata';
import { Field, ObjectType, InputType } from 'type-graphql';
import { IsDate } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from '../scalar/ObjectId.scalar';

@ObjectType()
export class Default {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  @IsDate()
  readonly create_at!: Date;

  @Field({ nullable: true })
  @IsDate()
  readonly update_at!: Date;
}

@InputType()
export class InputID {
  @Field(type => ObjectIdScalar)
  readonly id!: ObjectId;
}

@InputType()
export class InputAccessToken {
  @Field(type => String)
  access_token!: string;
}

@ObjectType()
export class AccessToken {
  @Field(type => String)
  access_token!: string;
}
