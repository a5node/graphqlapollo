import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root, Authorized } from 'type-graphql';
import UserServers from './user.servers';

import { InputFilter } from '../default.schema';
import { Role } from '../../interface';
import User, {
  InputCreateUser,
  CreateUser,
  FindUser,
  FindUsers,
  TypeUser,
  InputFindUser,
  InputUpdateUser,
  InputAddOrRemoveUser,
  InputAddOrRemoveRoleUser,
} from './user.schema';
import { VISITOR } from '../constants';

@Resolver(of => User)
export default class {
  //--------Query----
  @Authorized(VISITOR, ...Object.values(Role))
  @Query(returns => FindUser)
  async findUser(@Arg('data') data: InputFindUser) {
    return await UserServers.findUser(data);
  }

  @Authorized(Object.values(Role))
  @Query(returns => [FindUsers])
  async getUsers(@Arg('data', { nullable: true }) data: InputFilter) {
    return await UserServers.getUsers(data);
  }

  //--------Mutation--Visitor--
  @Authorized(VISITOR)
  @Mutation(returns => CreateUser)
  async createUser(@Arg('data') data: InputCreateUser) {
    return await UserServers.createUser(data);
  }

  //--------Mutation--User and Amin--
  @Authorized(Object.values(Role))
  @Mutation(returns => FindUser)
  async updateUser(@Arg('data') data: InputUpdateUser) {
    return await UserServers.updateUser(data);
  }

  //------Mutation-for-Admin--
  @Authorized(Role.ADMIN)
  @Mutation(returns => FindUser)
  async addItemToUser(@Arg('data') data: InputAddOrRemoveUser) {
    return await UserServers.addItemToUser(data);
  }

  @Authorized(Role.ADMIN)
  @Mutation(returns => FindUser)
  async addRoleToUser(@Arg('data') data: InputAddOrRemoveRoleUser) {
    return await UserServers.addRoleToUser(data);
  }

  @Authorized(Object.values(Role.ADMIN))
  @Mutation(returns => FindUser)
  async removeRoleToUser(@Arg('data') data: InputAddOrRemoveRoleUser) {
    return await UserServers.removeRoleToUser(data);
  }
}
