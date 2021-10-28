'use strict';

import UserModel from '../user/user.model';
import { Http401Error, Http404Error, HttpError } from '../../errors/http-errors';
import { IUserInstance } from '../user/user.interface';

class AuthService {
  login = async (email: string, password: string): Promise<IUserInstance | HttpError> => {
    const user = (await UserModel.findOne({ email })) as IUserInstance;

    if (!user) {
      return new Http404Error({ code: 1000 });
    }

    if (user.password !== password) {
      return new Http401Error({ code: 1001, message: 'No auth' });
    }

    return user;
  };
}

export default new AuthService();
