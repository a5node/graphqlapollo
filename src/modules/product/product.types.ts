'use strick';

import { IProductSchema, IInputCreateProduct, IInputUpdateProduct } from '../../interface';

export type TGetAllProduct = () => Promise<IProductSchema[]>;
export type TFindProductById = (id: string) => Promise<IProductSchema | null>;
export type TCreateProduct = (input: IInputCreateProduct) => Promise<IProductSchema | null>;
export type TUpdateProduct = (input: IInputUpdateProduct) => Promise<IProductSchema | null>;
