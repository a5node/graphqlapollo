import 'reflect-metadata';
import { Arg, FieldResolver, Query, Mutation, Resolver, Root } from 'type-graphql';
import UserServers from './user.servers';

// import UserModel from './user.model';
// import { Http409Error } from '@server/errors/http-errors';
// import { IUserSchema } from './user.interface';
import User, { InputCreateUser, CreateUser } from './user.schema';

@Resolver(of => User)
export default class {
  @Query(returns => String)
  hello(): string {
    return 'User';
  }

  @Mutation(returns => CreateUser)
  async createUser(@Arg('data') data: InputCreateUser): Promise<CreateUser> {
    return await UserServers.createUser(data);
  }
}
