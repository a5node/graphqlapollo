'use strict';

import OrderModel from './order.model';
import { Http409Error, Http404Error, Http400Error } from '../../errors/http-errors';
import { TCreateOrder, TGetOrders, TGetOrdersUserId, TFindOrderById, TAddOrRemove, TUpdateOrder } from './order.types';

class OrderService {
  createOrder: TCreateOrder = async data => {
    let order = await OrderModel.create(data);

    if (!order) {
      throw new Http400Error({ code: 1200 });
    }
    const select = { password: 0 };

    const orders = await OrderModel.findOne({ _id: order._id }).populate('customer', select).populate('products');

    if (!orders) {
      throw new Http400Error({ code: 1200 });
    }

    return orders.jsonPayload();
  };

  findOrder: TFindOrderById = async data => {
    const order = await OrderModel.findOne({ _id: data.id });

    if (!order) {
      throw new Http400Error({ code: 1201 });
    }

    return order.jsonPayload();
  };

  getOrders: TGetOrders = async () => await OrderModel.find();

  getOrdersUserId: TGetOrdersUserId = async data => {
    const orders = await OrderModel.find({ customer: data.id }).exec();

    if (!orders) {
      throw new Http400Error({ code: 1201 });
    }

    return orders;
  };

  updateOrder: TUpdateOrder = async data => {
    const order = await OrderModel.findByIdAndUpdate(data.id, { $set: data }, { new: true });

    if (!order) {
      throw new Http400Error({ code: 1201 });
    }

    return order.jsonPayload();
  };

  addToOrder: TAddOrRemove = async ({ orderId, where, itemId }) =>
    await OrderModel.findByIdAndUpdate(
      orderId,
      {
        $push: { [where]: itemId },
      },
      { new: true },
    );

  removeFromOrder: TAddOrRemove = async ({ orderId, where, itemId }) =>
    await OrderModel.findByIdAndUpdate(
      orderId,
      {
        $pull: { [where]: itemId },
      },
      { new: true },
    );
}

export default new OrderService();
