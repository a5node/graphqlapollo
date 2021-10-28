'use strict';
import { Schema, model } from 'mongoose';

import { IProductSchema, IProductModel } from '../../interface';
import { ORDER, PRODUCT, PRODUCTS, USER } from '../constants';

const ProductSchema = new Schema<IProductSchema, IProductModel>(
  {
    price: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: USER, required: false },
    orders: [{ type: Schema.Types.ObjectId, ref: ORDER, required: false }],
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

const Product = model<IProductSchema, IProductModel>(PRODUCT, ProductSchema, PRODUCTS);

export default Product;
