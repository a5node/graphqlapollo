'use strict';

import {
  IOrderSchema,
  IInputCreateOrder,
  IInputUpdateOrder,
  IFindById,
  IDefault,
  IAddOrRemove,
  IComposer,
  IFilter,
} from '../../interface';

export type TCreateOrder = (data: IInputCreateOrder) => Promise<IOrderSchema & IDefault>;
export type TUpdateOrder = (data: IInputUpdateOrder) => Promise<IOrderSchema & IDefault>;
export type TFindOrderById = (data: IFindById) => Promise<IOrderSchema & IDefault>;
export type TGetOrdersUserId = (data: IFindById) => Promise<IOrderSchema[]>;
export type TGetOrders = (data: IComposer & IFilter) => Promise<IOrderSchema[]>;
export type TAddOrRemove = (data: IAddOrRemove) => Promise<IOrderSchema & IDefault>;
