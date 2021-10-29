import UserModel from './user.model';
import { Http409Error } from '../../errors/http-errors';
import { IUserSchema, IUserDefault } from './user.interface';

import {
  TFindUserByEmail,
  TFindUserById,
  TCreateUser,
  TUpdateUser,
  TGetAllUser,
  TRemoveItemFromUser,
  TAddItemToUser,
} from '@server/types';

class UserService {
  createUser: TCreateUser = async ({ name, email, password }) => {
    let user = await UserModel.findOne({ email });

    if (user) {
      const error = {
        message: 'User with email ${email} already exists',
        code: 5,
        status: 409,
      };

      throw new Http409Error({
        code: 5,
        message: JSON.stringify(error),
      });
    }

    const data = { name, email, password } as IUserSchema;

    const userNew = await UserModel.createUser(data);

    const access_token = userNew.token();

    return {
      name,
      email,
      id: userNew._id,
      access_token,
      create_at: userNew.create_at,
      update_at: userNew.update_at,
    } as IUserSchema & IUserDefault;
  };

  getAllUsers: TGetAllUser = async () => await UserModel.find();
  getUserByEmail: TFindUserByEmail = async email => await UserModel.findOne({ email });
  getUserById: TFindUserById = async id => await UserModel.findOne({ id });

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
