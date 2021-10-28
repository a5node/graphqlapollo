'use strict';
import 'reflect-metadata';
import { Query, Resolver } from 'type-graphql';

//import { Http409Error } from '@server/errors/http-errors';

import Product from './product.schema';

@Resolver(of => Product)
export default class {
  @Query(returns => String)
  hello1(): String {
    return 'Product';
  }
}
