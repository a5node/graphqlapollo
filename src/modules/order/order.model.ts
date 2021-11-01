'use strict';
import { Schema, model } from 'mongoose';

import { IOrderSchema, IOrderModel, IOrderInstance, Dictionary } from '../../interface';
import { ORDER, ORDERS, PRODUCT, USER } from '../constants';

const OrderSchema = new Schema<IOrderSchema, IOrderModel>(
  {
    price: { type: Number, default: 0, required: true },
    paid: { type: Boolean, default: false, required: true },
    sent: { type: Boolean, default: false, required: true },
    processed: { type: Boolean, default: false, required: true },
    customer: { type: Schema.Types.ObjectId, ref: USER, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: PRODUCT, required: true }],
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
    price: this.price,
    paid: this.paid,
    sent: this.sent,
    processed: this.processed,
    customer: this.customer,
    products: this.products,
    create_at: this?.create_at,
    update_at: this?.update_at,
    ...payload,
  };
};

const Order = model<IOrderInstance, IOrderModel>(ORDER, OrderSchema, ORDERS);

export default Order;
