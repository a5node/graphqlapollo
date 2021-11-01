import UserModel from './user.model';
import { Http409Error, Http404Error } from '../../errors/http-errors';
import { IUserSchema, IUserServer } from './user.interface';

import { TFindUser, TCreateUser, TUpdateUser, TGetUser, TRemoveItemFromUser, TAddItemToUser } from '@server/types';
import { ORDERS } from '../constants';

class UserService implements IUserServer {
  createUser: TCreateUser = async ({ name, email, password }) => {
    let user = await UserModel.findOne({ email });

    if (user) {
      throw new Http409Error({
        code: 5,
        message: `User with email ${email} already exists`,
      });
    }

    const data = { name, email, password } as IUserSchema;

    const userNew = await UserModel.createUser(data);

    return userNew.jsonPayload({ access_token: userNew.token() });
  };

  findUser: TFindUser = async ({ id, email }) => {
    let user;
    const select = { user: { password: 0, orders: 0 } };

    if (email) {
      user = await UserModel.findOne({ email }).populate(ORDERS, select);
    } else {
      user = await UserModel.findOne({ id }).populate(ORDERS, select);
    }

    if (!user) {
      throw new Http404Error({ code: 6 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };

  getUsers: TGetUser = async () => await UserModel.find();

  updateUser: TUpdateUser = async ({ input }) =>
    await UserModel.findByIdAndUpdate(input.id, { $set: input }, { new: true });

  addItemToUser: TAddItemToUser = async ({ userId, where, itemId }) =>
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { [where]: itemId },
      },
      { new: true },
    );

  removeItemFromUser: TRemoveItemFromUser = async ({ userId, where, itemId }) =>
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { [where]: itemId },
      },
      { new: true },
    );
}
export default new UserService();
