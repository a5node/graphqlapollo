import 'reflect-metadata';
import { Arg, Query, Mutation, Resolver, Authorized } from 'type-graphql';
import { Role } from '../../interface';
import Order, { InputCreateOrder, InputOrderId, InputAddOrRemoveOrder, InputUpdateOrder } from './order.schema';
import OrderServers from './order.servers';
import { InputFilter } from '../default.schema';

@Resolver(of => Order)
export default class {
  @Authorized(Object.values(Role))
  @Query(returns => Order)
  async findOrder(@Arg('data') data: InputOrderId) {
    return await OrderServers.findOrder(data);
  }

  @Authorized(Object.values(Role))
  @Query(returns => [Order])
  async getOrders(@Arg('data', { nullable: true }) data: InputFilter) {
    return await OrderServers.getOrders(data);
  }

  @Authorized(Object.values(Role))
  @Query(returns => [Order])
  async getOrdersUserId(@Arg('data') data: InputOrderId) {
    return await OrderServers.getOrdersUserId(data);
  }

  //--------Mutation----
  @Authorized(Object.values(Role))
  @Mutation(returns => Order)
  async createOrder(@Arg('data') data: InputCreateOrder) {
    return await OrderServers.createOrder(data);
  }

  @Authorized(Object.values(Role))
  @Mutation(returns => Order)
  async updateOrder(@Arg('data') data: InputUpdateOrder) {
    return await OrderServers.updateOrder(data);
  }

  @Authorized(Object.values(Role))
  @Mutation(returns => Order)
  async addToOrder(@Arg('data') data: InputAddOrRemoveOrder) {
    return await OrderServers.addToOrder(data);
  }

  @Authorized(Object.values(Role))
  @Mutation(returns => Order)
  async removeFromOrder(@Arg('data') data: InputAddOrRemoveOrder) {
    return await OrderServers.removeFromOrder(data);
  }
}
