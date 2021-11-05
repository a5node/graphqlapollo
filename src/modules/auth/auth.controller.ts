import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';

import UserModel from '../user/user.model';
import { validateToken } from '../../lib/token';
import { Http403Error, Http401Error } from '../../errors/http-errors';
import { IUserInstance } from '../user/user.interface';

export default class AuthController {
  static auth = async (req: Request, res: Response, next: NextFunction): Promise<IUserInstance> => {
    if (!req.token) {
      throw new Http401Error({
        code: 1000,
        message: 'User not authorized',
        status: 403,
      });
    }

    const { valid, data } = validateToken(req.token);

    if (!valid) {
      throw new Http401Error({
        code: 1000,
        message: 'User not authorized',
        status: 403,
      });
    }

    const user = await UserModel.findById(data.userId);

    if (!user) {
      throw new Http401Error({
        code: 1000,
        message: 'User not authorized',
        status: 403,
      });
    }

    return user;
  };

  static logout = async (req: Request, res: Response): Promise<void> => {
    req.token = '';
    res.set('Authorization', `Bearer ''`);
    res.status(204).end()
  };
}
