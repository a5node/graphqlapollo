'use strict';

import { Request, Response, NextFunction } from 'express';

import UserModel from '../user/user.model';
import { validateToken } from '../../lib/token';
import { Http403Error, Http401Error } from '../../errors/http-errors';

export default class AuthController {
  static auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token: any = req.token;

    res.on.toString();

    const { valid, data } = validateToken(token);

    if (!valid) {
      const error = {
        message: 'User not authorized',
        code: 1000,
        status: 403,
      };

      throw new Http401Error({ code: 1000, message: JSON.stringify(error) });
    }

    const user = await UserModel.findById(data.userId);

    if (!user) {
      const error = {
        message: 'User not authorized',
        code: 1000,
        status: 403,
      };
      throw new Http403Error({ code: 1000, message: JSON.stringify(error) });
    }

    next();
  };

  static logout = async (req: Request, res: Response): Promise<void> => {
    req.token = '';
    res.set('Authorization', `Bearer ''`);

    res.status(204).send({
      success: true,
      message: 'User logout',
    });
  };
}

// export default {
//   auth: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const token: any = req.token;

//     const { valid, data } = validateToken(token);

//     if (!valid) {
//       const error = {
//         message: 'User not authorized',
//         code: 1000,
//         status: 403,
//       };

//       throw new Http401Error({ code: 1000, message: JSON.stringify(error) });
//     }

//     const user = await UserModel.findById(data.userId);

//     if (!user) {
//       const error = {
//         message: 'User not authorized',
//         code: 1000,
//         status: 403,
//       };
//       throw new Http403Error({ code: 1000, message: JSON.stringify(error) });
//     }

//     next();
//   },

//   logout: async (req: Request, res: Response): Promise<void> => {
//     req.token = '';
//     res.set('Authorization', `Bearer ''`);

//     res.status(204).send({
//       success: true,
//       message: 'User logout',
//     });
//   },
// };
