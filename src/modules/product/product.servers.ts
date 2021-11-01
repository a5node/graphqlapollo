'use strict';

import ProductModel from './product.model';
import { TCreateProduct, TUpdateProduct, TGetProducts, TFindProductById } from '@server/types';
import { ORDERS, USERS } from '../constants';
import { Http404Error, Http400Error } from '../../errors/http-errors';

class ProductService {
  createProduct: TCreateProduct = async data => {
    const product = await ProductModel.create(data);

    if (!product) {
      throw new Http400Error({ code: 1100 });
    }

    return product.jsonPayload();
  };

  findProduct: TFindProductById = async data => {
    const select = { user: { password: 0, orders: 0 } };

    const product = await ProductModel.findById(data.id).populate(ORDERS, select).populate(USERS, select);

    if (!product) {
      throw new Http404Error({ code: 1101 });
    }

    return product.jsonPayload();
  };

  getProducts: TGetProducts = async () => await ProductModel.find();

  updateProduct: TUpdateProduct = async data => {
    const product = await ProductModel.findByIdAndUpdate(data.id, { $set: data }, { new: true });

    if (!product) {
      throw new Http404Error({ code: 1102 });
    }

    return product.jsonPayload();
  };
}

export default new ProductService();
