import 'reflect-metadata';
import { Arg, Query, Resolver } from 'type-graphql';

import AuthServers from './auth.servers';

import User from '../user/user.schema';

import { InputLogin } from './auth.schema';

@Resolver(of => User)
export default class {
  @Query(returns => User)
  async login(@Arg('data') data: InputLogin) {
    console.dir(data);
    return await AuthServers.login(data);
  }
}
