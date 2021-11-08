'use strict';
import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root, Authorized } from 'type-graphql';

import { Role } from '../../interface';

import { InputID } from '../default.schema';
import Product, {
  Products,
  CreateProduct,
  InputCreateProduct,
  UpdateProduct,
  InputUpdateProduct,
} from './product.schema';
import ProductServers from './product.servers';

@Resolver(of => Product)
export default class {
  @Authorized(Object.values(Role))
  @Query(returns => Products)
  async findProduct(@Arg('data') data: InputID) {
    return await ProductServers.findProduct(data);
  }

  @Authorized(Object.values(Role))
  @Query(returns => [Product])
  async getProducts() {
    return await ProductServers.getProducts();
  }

  //--------Mutation----
  @Authorized(Object.values(Role))
  @Mutation(returns => CreateProduct)
  async createProduct(@Arg('data') data: InputCreateProduct) {
    return await ProductServers.createProduct(data);
  }

  @Authorized(Object.values(Role))
  @Mutation(returns => UpdateProduct)
  async updateProduct(@Arg('data') data: InputUpdateProduct) {
    return await ProductServers.updateProduct(data);
  }
}
