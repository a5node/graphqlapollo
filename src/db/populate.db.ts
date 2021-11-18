import OrderModel from '../modules/order/order.model';
import UserModel from '../modules/user/user.model';
import ProductModel from '../modules/product/product.model';
import { ORDERS, PRODUCTS, CREATOR, CUSTOMER } from '../modules/constants';

export default class Populate {
  select: unknown = {
    __v: 0,
  };

  populateP = (selectP?: unknown, selectC?: unknown) => {
    return {
      path: PRODUCTS,
      model: ProductModel,
      select: selectP || this.select,
      match: {},
      options: {
        sort: { create_at: -1 },
        limit: 0,
        skip: 0,
      },
      populate: {
        path: CREATOR,
        select: selectC || this.select,
        model: UserModel,
      },
    };
  };

  populateO = () => {
    return {
      path: ORDERS,
      model: OrderModel,
      select: this.select,
      match: {},
      options: {
        sort: { create_at: -1 },
        limit: 0,
        skip: 0,
      },
      populate: {
        path: PRODUCTS,
        select: this.select,
      },
    };
  };

  populateCr = (select?: unknown) => {
    return {
      path: CREATOR,
      model: UserModel,
      select: select || this.select,
      match: {},
      options: {
        sort: { create_at: -1 },
        limit: 0,
        skip: 0,
      },
    };
  };

  populateCu = (select?: unknown) => {
    return {
      path: CUSTOMER,
      model: UserModel,
      select: select || this.select,
      match: {},
      options: {
        sort: { create_at: -1 },
        limit: 0,
        skip: 0,
      },
    };
  };
}
