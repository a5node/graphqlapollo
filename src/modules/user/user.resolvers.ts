'use strict';
import 'reflect-metadata';
import { Arg, FieldResolver, Query, Mutation, Resolver, Root } from 'type-graphql';

// import UserModel from './user.model';
// import { Http409Error } from '@server/errors/http-errors';
// import { IUserSchema } from './user.interface';
import Users from './user.schema';

@Resolver(of => Users)
export default class {
  @Query(returns => String)
  hello(): String {
    return 'Welcome';
  }

  // @Mutation(returns => User)
  // createUser(
  //   @Arg('name') name: String,
  //   @Arg('email') email: String
  // ): UserData[] {
  //   let id = users.length + 1;
  //   return users.concat({
  //     id,
  //     name,
  //     email
  //   });
  // }
}
