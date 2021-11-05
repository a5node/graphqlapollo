'use strick';
import { Model, Document, ObjectId } from 'mongoose';

import { Dictionary, IOrderSchema, IUserSchema } from '../../interface';

export interface IProductDefault {
  readonly id: string | ObjectId;
  readonly create_at: Date;
  readonly update_at: Date;
}

export interface IInputCreateProduct {
  price: number;
  title: string;
  content: string;
  creator: string;
}

export interface IInputUpdateProduct {
  id: ObjectId;
  price?: number;
  title?: string;
  content?: string;
}

export interface IProductSchema extends Document {
  price: number;
  title: string;
  content: string;
  creator: string | IUserSchema;
  isRemove: boolean;
  amount: number;
}

export interface IFindProduct {
  id: ObjectId;
}

export interface IProductInstance extends IProductSchema {
  jsonPayload<T = Dictionary>(payload?: T): IProductSchema & IProductDefault;
}

export interface IProductModel extends Model<IProductInstance> {}

export interface IServerProduct {}
