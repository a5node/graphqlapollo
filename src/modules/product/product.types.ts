'use strick';
import { ObjectId } from 'mongoose';
import {
  IInputCreateProduct,
  IInputUpdateProduct,
  IProductInstance,
  IFindProduct,
  IProductSchema,
  IProductDefault,
  IFindById,
} from '../../interface';

export type TGetProducts = () => Promise<IProductInstance[]>;
export type TGetProductsUserId = (data: IFindById) => Promise<IProductSchema[]>;
export type TFindProductById = (data: IFindProduct) => Promise<IProductSchema & IProductDefault>;
export type TCreateProduct = (data: IInputCreateProduct) => Promise<IProductSchema & IProductDefault>;
export type TUpdateProduct = (data: IInputUpdateProduct) => Promise<IProductSchema & IProductDefault>;

