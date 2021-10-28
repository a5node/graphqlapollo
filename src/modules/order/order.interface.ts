'use strict';
import { Schema, Document, Model } from 'mongoose';

import { IProductSchema, IUserSchema } from '../../interface';

export interface IOrderSchema extends Document {
  createData: Date;
  user: IUserSchema | Schema.Types.ObjectId;
  products: IProductSchema[] | Schema.Types.ObjectId[];
}

export interface IInputCreateOrder {
  input: {
    id?: string;
    name: string;
    password: string;
    email: string;
  };
}

export interface IInputUpdateOrder {
  input: {
    id: string;
    password?: string;
    email?: string;
  };
}

export interface IOrderInstance extends IOrderSchema {}

export interface IOrderModel extends Model<IOrderInstance> {}
