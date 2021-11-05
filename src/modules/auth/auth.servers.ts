import { Request } from 'express';
import { AuthChecker } from 'type-graphql';

import config from '../../config';
import UserModel from '../user/user.model';
import OrderModel from '../order/order.model';
import { validateToken } from '../../lib/token';
import { Http401Error, Http404Error, HttpError } from '../../errors/http-errors';
import { Context } from '../../interface';
import { VISITOR, ORDERS, PRODUCTS } from '../constants';

class AuthService {
  login = async ({ email, password }: { email: string; password: string }): Promise<any | HttpError> => {
    const select = { __v: 0 };

    const options = {
      path: ORDERS,
      model: OrderModel,
      select,
      populate: {
        path: PRODUCTS,
        select,
      },
    };
    const user = await UserModel.findOne({ email }).populate(options);

    if (!user) {
      throw new Http404Error({ code: 1000 });
    }

    try {
      await user.verifyPassword(password);

      return user.jsonPayload({ access_token: user.token() });
    } catch (error: unknown) {
      throw new Http404Error({ code: 1000 });
    }
  };

  auth = async (req: Request): Promise<any> => {
    const { apollo_user, apollo_key, authorization } = req.headers;

    if (apollo_key !== config.apolloKey) {
      throw new Error();
    }

    if (!config.apolloUsers.split(' ').includes(apollo_user as string)) {
      throw new Error();
    }

    if (!authorization) {
      return {
        roles: [VISITOR],
      };
    }

    try {
      const { valid, data } = validateToken(authorization);

      if (!valid) {
        throw new Error();
      }

      return { ...data, valid };
    } catch (error) {
      return {
        roles: [VISITOR],
      };
    }
  };

  authChecker: AuthChecker<Context> = async ({ root, args, context: { user }, info: { fieldName, path } }, roles) => {
    // console.log('--user-->', user);
    console.log('--roles-->', roles);
    // console.log('--fieldName-->', fieldName);
    // console.log('--path-->', path);
    // // console.log('--args-->', args);
    // console.log('--root-->', root);

    const { key, prev, typename } = path;

    if (roles.length === 0) {
      // if `@Authorized()`, check only if user exists
      return user !== undefined;
    }
    // there are some roles defined now
    if (!user) {
      // and if no user, restrict access
      throw new Http401Error({ code: 1004, message: "You have't allows" });
    }

    if (key === 'createUser' && typename === 'Mutation' && user.roles.some(role => role === VISITOR)) {
      return true;
    }

    if (user.roles.some(role => roles.includes(role))) {
      // grant access if the roles overlap

      if (!roles.includes(VISITOR) && user.id) {
        const auth = await UserModel.findById(user.id).select({ passport: 0 });

        if (!auth) {
          throw new Http401Error({ code: 1004, message: "You have't allows" });
        }

        return true;
      }
      return true;
    }
    // no roles matched, restrict access
    throw new Http401Error({ code: 1005, message: "You can't do it" });
  };

  // logout = async (req: Request, res: Response): Promise<void> => {
  //   req.token = '';
  //   res.set('Authorization', `Bearer ''`);
  //   res.status(204).end();
  // };
}

export default new AuthService();
