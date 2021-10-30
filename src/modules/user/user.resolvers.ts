import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root } from 'type-graphql';
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

  @Query(returns => CreateUser)
  async findUser(@Arg('data') data: InputCreateUser): Promise<CreateUser> {
    return await UserServers.createUser(data);
  }

  @Query(returns => CreateUser)
  async getUsers(@Arg('data') data: InputCreateUser): Promise<CreateUser> {
    return await UserServers.createUser(data);
  }

  @Mutation(returns => CreateUser)
  async createUser(@Arg('data') data: InputCreateUser): Promise<CreateUser> {
    return await UserServers.createUser(data);
  }

  @Mutation(returns => CreateUser)
  async updateUser(@Arg('data') data: InputCreateUser): Promise<CreateUser> {
    return await UserServers.createUser(data);
  }
}
