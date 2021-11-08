'use strict';
import OrderModel from '../order/order.model';
import UserModel from '../user/user.model';
import ProductModel from './product.model';
import { TCreateProduct, TUpdateProduct, TGetProducts, TFindProductById } from '@server/types';

import { PRODUCTS, CUSTOMER, ORDERS, CREATOR, USERS } from '../constants';
import { Http404Error, Http400Error } from '../../errors/http-errors';

class ProductService {
  private select: unknown = {
    __v: 0,
  };
  private populateO = () => {
    return {
      path: ORDERS,
      model: OrderModel,
      select: this.select,
      populate: {
        path: PRODUCTS,
        select: this.select,
      },
    };
  };

  private populateP = (selectP?: unknown, selectC?: unknown) => {
    return {
      path: PRODUCTS,
      model: ProductModel,
      select: selectP || this.select,
      populate: {
        path: CREATOR,
        select: selectC || this.select,
        model: UserModel,
      },
    };
  };

  private populateC = (select?: unknown) => {
    return {
      path: CREATOR,
      model: UserModel,
      select: select || this.select,
    };
  };

  createProduct: TCreateProduct = async data => {
    const product = await ProductModel.create(data);

    if (!product) {
      throw new Http400Error({ code: 1100 });
    }

    return product.jsonPayload();
  };

  findProduct: TFindProductById = async data => {
    const product = await ProductModel.findById(data.id).populate(this.populateC()).exec();

    if (!product) {
      throw new Http404Error({ code: 1101 });
    }

    return product.jsonPayload();
  };

  getProducts: TGetProducts = async () => await ProductModel.find().populate(this.populateC()).exec();

  updateProduct: TUpdateProduct = async data => {
    const product = await ProductModel.findByIdAndUpdate(data.id, { $set: data }, { new: true })
      .populate(this.populateC())
      .exec();

    if (!product) {
      throw new Http404Error({ code: 1102 });
    }

    return product.jsonPayload();
  };
}

export default new ProductService();
