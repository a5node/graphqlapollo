import 'reflect-metadata';
import { Field, ObjectType, InputType } from 'type-graphql';
import { IsDate } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from '../scalar/ObjectId.scalar';
import { IComposer, Dictionary } from '../interface';

@InputType()
export class Sort {
  @Field(type => Number, { nullable: true })
  create_at!: number;

  @Field(type => Number, { nullable: true })
  update_at!: number;

  @Field(type => Number, { nullable: true })
  price!: number;

  get data(): Dictionary {
    return this;
  }
}

@InputType()
export class Limit {
  @Field(type => Number, { nullable: true })
  skip!: number;

  @Field(type => Number, { nullable: true })
  limit!: number;
}
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
export class InputFilter {
  @Field(type => Number, { nullable: true })
  skip!: number;

  @Field(type => Number, { nullable: true })
  limit!: number;

  // @Field(type => Limit, { nullable: true })
  // Limit!: Limit;

  @Field(type => Sort, { nullable: true })
  sort!: Sort;
}

@InputType()
export class InputID {
  @Field(type => ObjectIdScalar)
  readonly id!: ObjectId;

  @Field(type => InputFilter, { nullable: true })
  filter!: InputFilter;
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
