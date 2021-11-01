'use strict';
import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Root } from 'type-graphql';

import Order, { InputCreateOrder, InputOrderId, InputAddOrRemoveOrder, InputUpdateOrder } from './order.schema';
import OrderServers from './order.servers';

@Resolver(of => Order)
export default class {
  @Query(returns => Order)
  async findOrder(@Arg('data') data: InputOrderId) {
    return await OrderServers.findOrder(data);
  }

  @Query(returns => [Order])
  async getOrders() {
    return await OrderServers.getOrders();
  }

  @Query(returns => [Order])
  async getOrdersUserId(@Arg('data') data: InputOrderId) {
    return await OrderServers.getOrdersUserId(data);
  }

  //--------Mutation----
  @Mutation(returns => Order)
  async createOrder(@Arg('data') data: InputCreateOrder) {
    return await OrderServers.createOrder(data);
  }

  @Mutation(returns => Order)
  async updateOrder(@Arg('data') data: InputUpdateOrder) {
    return await OrderServers.updateOrder(data);
  }

  @Mutation(returns => Order)
  async addToOrder(@Arg('data') data: InputAddOrRemoveOrder) {
    return await OrderServers.addToOrder(data);
  }

  @Mutation(returns => Order)
  async removeFromOrder(@Arg('data') data: InputAddOrRemoveOrder) {
    return await OrderServers.removeFromOrder(data);
  }
}
