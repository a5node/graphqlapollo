import { Schema, model } from 'mongoose';

import { IProductSchema, IProductModel, Dictionary } from '../../interface';
import { ORDER, ORDERS, PRODUCT, PRODUCTS, USER, USERS } from '../constants';

import User from '../user/user.model';

const ProductSchema = new Schema<IProductSchema, IProductModel>(
  {
    price: { type: Number, required: true },
    title: { type: String, required: true, immutable: true },
    content: { type: String, required: true },
    amount: { type: Number, default: 0, required: true },
    isRemove: { type: Boolean, default: false, required: true },
    creator: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
      immutable: true,
    },
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

ProductSchema.methods.jsonPayload = function <T = Dictionary>(payload?: T) {
  return {
    id: this._id,
    _id: this._id,
    price: this.price,
    title: this.title,
    content: this.content,
    creator: this.creator,
    create_at: this?.create_at,
    update_at: this?.update_at,
    amount: this.amount,
    isRemove: this.isRemove,
    ...payload,
  };
};

const Product = model<IProductSchema, IProductModel>(PRODUCT, ProductSchema, PRODUCTS);

export default Product;
