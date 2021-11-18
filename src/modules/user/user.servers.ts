import UserModel from './user.model';
import { TFindUser, TCreateUser, TUpdateUser, TGetUsers, TAddItemToUser, TAddOrRemoveRole } from './user.types';
import { IUserSchema } from './user.interface';

import { Http409Error, Http404Error } from '../../errors/http-errors';
import { filterDB } from '../../db/filter.db';
import Populate from '../../db/populate.db';

class UserService extends Populate {
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
      user = await UserModel.findOne({ email }).populate(this.populateO()).exec();
    } else {
      user = await UserModel.findOne({ id }).populate(this.populateO()).exec();
    }

    if (!user) {
      throw new Http404Error({ code: 6 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };

  getUsers: TGetUsers = async data => {
    const { skip, limit } = filterDB(data);

    const users = await UserModel.find().skip(skip).limit(limit).select({ password: 0 }).populate(this.populateO());

    return users;
  };

  updateUser: TUpdateUser = async data => {
    const user = await UserModel.findByIdAndUpdate(data.id, { $set: data }, { new: true })
      .populate(this.populateO())
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
      .populate(this.populateO())
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
      .populate(this.populateO())
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
      .populate(this.populateO())
      .exec();

    if (!user) {
      throw new Http404Error({ code: 9 });
    }

    return user.jsonPayload({ access_token: user.token() });
  };
}
export default new UserService();
