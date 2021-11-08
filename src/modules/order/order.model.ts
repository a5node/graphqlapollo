'use strict';
import { Schema, model } from 'mongoose';

import { IOrderSchema, IOrderModel, IOrderInstance, Dictionary, IAddOrderToUser } from '../../interface';
import { ORDER, ORDERS, PRODUCT, USER } from '../constants';
import UserServer from '../user/user.servers';

const OrderSchema = new Schema<IOrderSchema, IOrderModel>(
  {
    price: { type: Number, default: 0, required: true },
    paid: { type: Boolean, default: false, required: true },
    sent: { type: Boolean, default: false, required: true },
    received: { type: Boolean, default: false, required: true },
    processed: { type: Boolean, default: false, required: true },
    isRemove: { type: Boolean, default: false, required: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
      autopopulate: {
        select: { password: 0 },
      },
      immutable: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: PRODUCT,
        required: true,
        autopopulate: {
          select: { __v: 0 },
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

OrderSchema.methods.jsonPayload = function <T = Dictionary>(payload?: T) {
  return {
    id: this._id,
    _id: this._id,
    price: this.price,
    paid: this.paid,
    sent: this.sent,
    processed: this.processed,
    customer: this.customer,
    products: this.products,
    create_at: this?.create_at,
    update_at: this?.update_at,
    isRemove: this.isRemove,
    ...payload,
  };
};

OrderSchema.methods.addUserOrder = async function (data: IAddOrderToUser) {
  return await UserServer.addItemToUser({ ...data, where: ORDERS });
};

const Order = model<IOrderInstance, IOrderModel>(ORDER, OrderSchema, ORDERS);

export default Order;
