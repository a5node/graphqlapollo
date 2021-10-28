'use strict';
import 'reflect-metadata';
import { Query, Resolver } from 'type-graphql';

//import { Http409Error } from '@server/errors/http-errors';

import Order from './order.schema';

@Resolver(of => Order)
export default class {
  @Query(returns => String)
  hello2(): String {
    return 'Order';
  }
}
