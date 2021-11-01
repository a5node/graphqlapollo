'use strict';
import { Document, Model, ObjectId } from 'mongoose';

import { IProductSchema, IUserSchema, Dictionary, IDefault, IFindById } from '../../interface';

export interface IOrderSchema extends Document {
  price: number;
  paid: boolean;
  sent: boolean;
  processed: boolean;
  products: IProductSchema[] | ObjectId[];
  readonly customer: IUserSchema | ObjectId;
  readonly create_at?: Date;
  readonly update_at?: Date;
}

export interface IInputCreateOrder {
  price: number;
  customer: ObjectId;
  products: ObjectId[];
}

export interface IInputUpdateOrder extends IFindById {
  paid?: boolean;
  sent?: boolean;
  processed?: boolean;
  products?: ObjectId[];
}

export interface IAddOrRemove {
  orderId: ObjectId;
  where: string;
  itemId: ObjectId[];
}

export interface IOrderInstance extends IOrderSchema {
  jsonPayload<T = Dictionary>(payload?: T): IOrderSchema & IDefault;
}

export interface IOrderModel extends Model<IOrderInstance> {}
