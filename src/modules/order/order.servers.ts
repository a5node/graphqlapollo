import OrderModel from './order.model';
import Populate from '../../db/populate.db';
import { Http400Error } from '../../errors/http-errors';
import { TCreateOrder, TGetOrders, TGetOrdersUserId, TFindOrderById, TAddOrRemove, TUpdateOrder } from './order.types';
import { PRODUCTS } from '../constants';
import { filterDB } from '../../db/filter.db';

class OrderService extends Populate {
  createOrder: TCreateOrder = async data => {
    let order;

    order = await OrderModel.create(data);

    if (!order) {
      throw new Http400Error({ code: 1200 });
    }
    const select = { password: 0 };

    const addUser = order.addUserOrder({ itemId: order._id, id: data.customer });

    const orderPopulate = OrderModel.findOne({ _id: order._id })
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();

    const payload = await Promise.all([addUser, orderPopulate]);

    if (!payload[1]) {
      throw new Http400Error({ code: 1200 });
    }

    return payload[1].jsonPayload();
  };

  findOrder: TFindOrderById = async data => {
    const select = { password: 0 };

    const order = await OrderModel.findOne({ _id: data.id })
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();

    if (!order) {
      throw new Http400Error({ code: 1201 });
    }

    return order.jsonPayload();
  };

  getOrders: TGetOrders = async data => {
    const select = { password: 0 };

    const { skip, limit } = filterDB({ ...data, ...data?.filter });
    const orders = await OrderModel.find({}, null, { skip, limit })
      .sort({ create_at: -1 })
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();
    return orders;
  };

  getOrdersUserId: TGetOrdersUserId = async data => {
    const select = { password: 0 };

    const { skip, limit } = filterDB({ ...data, ...data?.filter });

    const orders = await OrderModel.find({ customer: data.id }, {}, { skip, limit })
      .sort({ create_at: -1 })
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();

    if (!orders) {
      throw new Http400Error({ code: 1202 });
    }

    return orders;
  };

  updateOrder: TUpdateOrder = async data => {
    const select = { password: 0 };
    const order = await OrderModel.findByIdAndUpdate(data.id, { $set: data }, { new: true })
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();

    if (!order) {
      throw new Http400Error({ code: 1203 });
    }

    return order.jsonPayload();
  };

  addToOrder: TAddOrRemove = async ({ id, where, itemId }) => {
    const select = { password: 0 };
    const order = await OrderModel.findByIdAndUpdate(
      id,
      {
        $push: { [PRODUCTS]: { $in: itemId } },
      },
      { new: true },
    )
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();

    if (!order) {
      throw new Http400Error({ code: 1204 });
    }

    return order.jsonPayload();
  };

  removeFromOrder: TAddOrRemove = async ({ id, where, itemId }) => {
    const select = { password: 0 };
    const order = await OrderModel.findByIdAndUpdate(
      id,
      {
        $pull: { [PRODUCTS]: { $in: itemId } },
      },
      { new: true },
    )
      .populate(this.populateCu(select))
      .populate(this.populateP())
      .exec();

    if (!order) {
      throw new Http400Error({ code: 1205 });
    }

    return order.jsonPayload();
  };
}

export default new OrderService();
