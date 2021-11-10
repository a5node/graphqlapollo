import { Schema, model } from 'mongoose';

import { USER, USERS } from '../constants';
import { generateToken } from '../../lib/token';
import { checkPassword, hashPassword } from '../../lib/password';
import { Http403Error } from '../../errors/http-errors';
import { Role } from '../../interface';
import { IUserSchema, IUserInstance, IUserModel } from './user.interface';
import { Dictionary } from '../../interface';
import Order from '../order/order.model';

const UserSchema = new Schema<IUserSchema, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, immutable: true },
    password: {
      type: String,
      required: true,
      // select: false  //Запрет на выдачу
    },
    roles: { type: [String], enum: Object.values(Role), required: true, default: [Role.USER] },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: Order,
        required: false,
        autopopulate: true,
      },
    ],
    access_token: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

UserSchema.statics.createUser = async function (date: Partial<IUserSchema>): Promise<IUserInstance> {
  if (!date.email || !date.password) {
    throw new Http403Error({ code: 13, message: 'Email or password not provided' });
  }

  const password = await hashPassword(date.password);

  let user: IUserInstance = new User({
    ...date,
    password,
  });

  return user.save();
};

UserSchema.methods.token = function (): string {
  return generateToken({ id: this._id.toString(), email: this.email.toString(), roles: this.roles });
};

UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean | Error> {
  try {
    const pass = await checkPassword(this.password, password);
    return pass;
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.jsonPayload = function <T = Dictionary>(payload?: T) {
  return {
    id: this._id,
    _id: this._id,
    name: this.name,
    email: this.email,
    orders: this.orders,
    roles: this.roles,
    create_at: this.create_at,
    update_at: this.update_at,
    ...payload,
  };
};

const User: IUserModel = model<IUserInstance, IUserModel>(USER, UserSchema, USERS);

export default User;
