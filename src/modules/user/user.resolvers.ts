import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root } from 'type-graphql';
import UserServers from './user.servers';

// import UserModel from './user.model';
// import { Http409Error } from '@server/errors/http-errors';
// import { IUserSchema } from './user.interface';
import { IUserSchema, IUserDefault } from './user.interface';
import User, { InputCreateUser, CreateUser, InputUserId, InputUserEmail, FindUser, InputFindUser } from './user.schema';

@Resolver(of => User)
export default class {
  @Query(returns => FindUser)
  async findUser(@Arg('data') data: InputFindUser) {
    return await UserServers.findUser(data);
  }

  @Query(returns => [FindUser])
  async getUsers() {
    return await UserServers.getUsers();
  }

  //--------Mutation----
  @Mutation(returns => CreateUser)
  async createUser(@Arg('data') data: InputCreateUser) {
    return await UserServers.createUser(data);
  }

  // @Mutation(returns => CreateUser)
  // async updateUser(@Arg('data') data: InputCreateUser): Promise<CreateUser> {
  //   return await UserServers.createUser(data);
  // }
}
