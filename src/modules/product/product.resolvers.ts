'use strict';
import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root } from 'type-graphql';

import Product, {
  CreateProduct,
  InputCreateProduct,
  UpdateProduct,
  InputUpdateProduct,
  InputProductId,
} from './product.schema';
import ProductServers from './product.servers';

@Resolver(of => Product)
export default class {
  @Query(returns => Product)
  async findProduct(@Arg('data') data: InputProductId) {
    return await ProductServers.findProduct(data);
  }

  @Query(returns => [Product])
  async getProducts() {
    return await ProductServers.getProducts();
  }

  //--------Mutation----
  @Mutation(returns => CreateProduct)
  async createProduct(@Arg('data') data: InputCreateProduct) {
    return await ProductServers.createProduct(data);
  }

  @Mutation(returns => UpdateProduct)
  async updateProduct(@Arg('data') data: InputUpdateProduct) {
    return await ProductServers.updateProduct(data);
  }
}
