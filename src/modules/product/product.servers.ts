import ProductModel from './product.model';
import { TCreateProduct, TUpdateProduct, TGetProducts, TFindProductById, TGetProductsUserId } from '@server/types';

import { CREATOR } from '../constants';
import { Http404Error, Http400Error } from '../../errors/http-errors';
import Populate from '../../db/populate.db';

class ProductService extends Populate {
  createProduct: TCreateProduct = async data => {
    const product = await ProductModel.create(data);

    if (!product) {
      throw new Http400Error({ code: 1100 });
    }

    return product.jsonPayload();
  };

  findProduct: TFindProductById = async data => {
    const product = await ProductModel.findById(data.id).populate(this.populateCr()).exec();

    if (!product) {
      throw new Http404Error({ code: 1101 });
    }

    return product.jsonPayload();
  };

  getProducts: TGetProducts = async () => await ProductModel.find().populate(this.populateCr()).exec();

  updateProduct: TUpdateProduct = async data => {
    const product = await ProductModel.findByIdAndUpdate(data.id, { $set: data }, { new: true })
      .populate(this.populateCr())
      .exec();

    if (!product) {
      throw new Http404Error({ code: 1102 });
    }

    return product.jsonPayload();
  };

  getProductsUserId: TGetProductsUserId = async data => {
    const orders = await ProductModel.find({ [CREATOR]: data.id })
      .populate(this.populateCr())
      .exec();

    if (!orders) {
      throw new Http400Error({ code: 1103 });
    }

    return orders;
  };
}

export default new ProductService();
