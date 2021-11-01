'use strict';

import {
  IOrderSchema,
  IInputCreateOrder,
  IInputUpdateOrder,
  IFindById,
  IDefault,
  IOrderInstance,
  IAddOrRemove,
} from '../../interface';

export type TCreateOrder = (data: IInputCreateOrder) => Promise<IOrderSchema & IDefault>;
export type TUpdateOrder = (data: IInputUpdateOrder) => Promise<IOrderSchema & IDefault>;
export type TFindOrderById = (data: IFindById) => Promise<IOrderSchema & IDefault>;
export type TGetOrdersUserId = (data: IFindById) => Promise<IOrderSchema[]>;
export type TGetOrders = () => Promise<IOrderSchema[]>;
export type TAddOrRemove = (data: IAddOrRemove) => Promise<IOrderInstance | null>;
