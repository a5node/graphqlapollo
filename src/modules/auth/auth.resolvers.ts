import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root, Authorized } from 'type-graphql';

import AuthServers from './auth.servers';
import { Role } from '../../interface';
import User, { FindUser, TypeUser } from '../user/user.schema';
import { VISITOR } from '../constants';
import { InputLogin } from './auth.schema';
import { AccessToken, InputAccessToken } from '../default.schema';

@Resolver(of => User)
export default class {
  @Authorized(VISITOR, ...Object.values(Role))
  @Query(returns => User)
  async login(@Arg('data') data: InputLogin) {
    return await AuthServers.login(data);
  }
}
