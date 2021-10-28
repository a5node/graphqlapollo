'use strict';
import { Schema, model } from 'mongoose';

import { IOrderSchema, IOrderModel, IOrderInstance } from '../../interface';
import { ORDER, ORDERS, PRODUCT, USER } from '../constants';

const OrderSchema = new Schema<IOrderSchema, IOrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: USER, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: PRODUCT, required: true }],
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

const Order = model<IOrderInstance, IOrderModel>(ORDER, OrderSchema, ORDERS);

export default Order;
