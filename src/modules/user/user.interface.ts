import { Document, Model, ObjectId } from 'mongoose';

import { IOrderSchema, Role, Dictionary } from '../../interface';
import { TCreateUser, TUpdateUser, TGetUsers, TAddItemToUser, TFindUser } from '../../types';

export interface IInputCreateUser {
  name: string;
  password: string;
  email: string;
}

export interface IInputUpdateUser {
  id: string | ObjectId;
  password?: string;
  email?: string;
}

export interface IInputFindUser {
  id?: string | ObjectId;
  email?: string;
}

export interface IAddOrRemoveRole {
  id: string | ObjectId;
  role: Role;
}

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string | any;
  orders?: IOrderSchema[] | ObjectId[] | string[];
  access_token?: string;
  roles: string[];
  readonly create_at?: Date;
  readonly update_at?: Date;
}

export interface IUserDefault {
  readonly id: string | ObjectId;
  access_token: string;
  readonly create_at: Date;
  readonly update_at: Date;
}

export interface Context {
  user?: {
    id: ObjectId;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
    valid: boolean;
  };
}

export interface IUserInstance extends IUserSchema {
  token(): string;
  verifyPassword(password: string): Promise<boolean>;
  jsonPayload<T = Dictionary>(payload?: T): IUserSchema & IUserDefault;
}

export interface IUserModel extends Model<IUserInstance> {
  createUser: (date: IUserSchema) => Promise<IUserInstance>;
}

export interface IUserServer {
  createUser: TCreateUser;
  findUser: TFindUser;
  updateUser: TUpdateUser;
  getUsers: TGetUsers;
  addItemToUser: TAddItemToUser;
}
