'use strict';
import * as express from 'express';

import order from '../modules/order/order.router';
import users from '../modules/user/user.router';
import auth from '../modules/auth/auth.router';
import product from '../modules/product/product.router';
import AuthController from '../modules/auth/auth.controller';

export default (app: express.Express): void => {
  app.use('/api/auth', auth);
  app.use('/api/order', AuthController.auth, order);
  app.use('/api/user', AuthController.auth, users);
  app.use('/api/product', AuthController.auth, product);
};
