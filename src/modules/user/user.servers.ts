import UserModel from './user.model';
import OrderModel from '../order/order.model';
import { Http409Error, Http404Error } from '../../errors/http-errors';
import { IUserSchema, IUserServer } from './user.interface';

import { TFindUser, TCreateUser, TUpdateUser, TGetUsers, TAddItemToUser, TAddOrRemoveRole } from '@server/types';
import { ORDERS, PRODUCTS, USERS } from '../constants';

class UserService implements IUserServer {
  private select: unknown = {
    __v: 0,
  };

  private populate = () => {
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

  createUser: TCreateUser = async ({ name, email, password }) => {
    const user = await UserModel.findOne({ email });

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

    if (email) {
      user = await UserModel.findOne({ email }).populate(this.populate()).exec();
    } else {
      user = await UserModel.findOne({ id }).populate(this.populate()).exec();
    }

    if (!user) {
      throw new Http404Error({ code: 6 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };

  getUsers: TGetUsers = async () => {
    const users = await UserModel.find().select({ password: 0 }).populate(this.populate());

    return users;
  };

  updateUser: TUpdateUser = async data => {
    const user = await UserModel.findByIdAndUpdate(data.id, { $set: data }, { new: true })
      .populate(this.populate())
      .exec();

    if (!user) {
      throw new Http404Error({ code: 7 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };

  addRoleToUser: TAddOrRemoveRole = async ({ id, role }) => {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { roles: role },
      },
      { new: true },
    )
      .populate(this.populate())
      .exec();

    if (!user) {
      throw new Http404Error({ code: 7 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };

  removeRoleToUser: TAddOrRemoveRole = async ({ id, role }) => {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        $pull: { roles: role },
      },
      { new: true },
    )
      .populate(this.populate())
      .exec();

    if (!user) {
      throw new Http404Error({ code: 8 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };

  addItemToUser: TAddItemToUser = async ({ id, where, itemId }) => {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { [where]: itemId },
      },
      { new: true },
    )
      .populate(this.populate())
      .exec();

    if (!user) {
      throw new Http404Error({ code: 9 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };
}
export default new UserService();
