'use strick';
import { Model, Schema, Document } from 'mongoose';

import { IOrderSchema, IUserSchema } from '../../interface';

export interface IInputCreateProduct {
  input: {
    id?: string;
    name: string;
    password: string;
    email: string;
  };
}

export interface IInputUpdateProduct {
  input: {
    id: string;
    password?: string;
    email?: string;
  };
}

export interface IProductSchema extends Document {
  price: string;
  title: string;
  content: string;
  creator?: IUserSchema | Schema.Types.ObjectId;
  orders?: IOrderSchema[] | Schema.Types.ObjectId[];
}

export interface IProductInstance extends IProductSchema {}

export interface IProductModel extends Model<IProductInstance> {}

export interface IServerProduct {}
