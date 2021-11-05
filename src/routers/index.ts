'use strict';
import * as express from 'express';

import order from '../modules/order/order.router';
import users from '../modules/user/user.router';
import auth from '../modules/auth/auth.router';
import product from '../modules/product/product.router';


export default (app: express.Express): void => {
  app.use('/api/auth', auth);
  app.use('/api/order', order);
  app.use('/api/user', users);
  app.use('/api/product', product);
};
