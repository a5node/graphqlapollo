import { Schema, Document, Model } from 'mongoose';
import { IOrderSchema } from '../../interface';
import { Dictionary } from '../../interface';

import { TCreateUser, TUpdateUser, TGetAllUser, TRemoveItemFromUser, TAddItemToUser, TFindUser } from '@server/types';

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

export interface IInputFindUser {
  id?: string | Schema.Types.ObjectId;
  email?: string;
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
  jsonPayload<T = Dictionary>(payload?: T): IUserSchema & IUserDefault;
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
  findUser: TFindUser;
  updateUser: TUpdateUser;
  getUsers: TGetAllUser;
  addItemToUser: TAddItemToUser;
  removeItemFromUser: TRemoveItemFromUser;
}
