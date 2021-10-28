'use strict';
import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

import User from '../user/user.schema';
import { ObjectIdScalar } from '../../scalar/ObjectId.scalar';

@ObjectType()
export default class Order {
  @Field(type => ObjectIdScalar, { nullable: true })
  readonly id!: string;

  @Field(type => User)
  user!: User;

  @Field(type => [User])
  products!: User[];
}
