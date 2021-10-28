'use strict';

import { IOrderSchema } from '../../interface';

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

export type TGetAllOrder = () => Promise<IOrderSchema[]>;
export type TFindOrderById = (id: string) => Promise<IOrderSchema | null>;
export type TCreateOrder = (input: IInputCreateOrder) => Promise<IOrderSchema | null>;
export type TUpdateOrder = (input: IInputUpdateOrder) => Promise<IOrderSchema | null>;
