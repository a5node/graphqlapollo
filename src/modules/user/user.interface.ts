import { Schema, Document, Model } from 'mongoose';
import { IOrderSchema } from '../../interface';

import {
  TFindUserByEmail,
  TFindUserById,
  TCreateUser,
  TUpdateUser,
  TGetAllUser,
  TRemoveItemFromUser,
  TAddItemToUser,
} from '@server/types';

export interface IInputCreateUser {
  name: string;
  password: string;
  email: string;
}

export interface IInputUpdateUser {
  input: {
    id: string;
    password?: string;
    email?: string;
  };
}

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string | any;
  orders?: IOrderSchema[] | Schema.Types.ObjectId[] | string[];
  access_token?: string;
  readonly create_at?: Date;
  readonly update_at?: Date;
}

export interface IUserDefault {
  readonly id: string | Schema.Types.ObjectId;
  access_token: string;
  readonly create_at: Date;
  readonly update_at: Date;
}

export interface IUserInstance extends IUserSchema {
  token(): string;
  verifyPassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserInstance> {
  findUserByIdAndUpdate: (id: string | number, newParams: string) => Promise<IUserSchema>;
  findUserByEmail: (email: string) => Promise<IUserSchema>;
  removeItemFromUser: (userId: string | number, where: string, itemId: string | number) => Promise<IUserSchema>;
  addItemToUser: (userId: string | number, where: string, itemId: string | number) => Promise<IUserSchema>;
  createUser: (date: IUserSchema) => Promise<IUserInstance>;
}

export interface IUserServer {
  createUser: TCreateUser;
  updateUser: TUpdateUser;
  getAllUsers: TGetAllUser;
  getUserByEmail: TFindUserByEmail;
  getUserById: TFindUserById;
  addItemToUser: TAddItemToUser;
  removeItemFromUser: TRemoveItemFromUser;
}
