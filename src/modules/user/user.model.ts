import { Schema, model } from 'mongoose';

import { ORDER, USER, USERS } from '../constants';
import { generateToken } from '../../lib/token';
import { checkPassword, hashPassword } from '../../lib/password';
import { Http403Error } from '../../errors/http-errors';

import { IUserSchema, IUserInstance, IUserModel } from './user.interface';

const UserSchema = new Schema<IUserSchema, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: ORDER }],
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
    throw new Error('Email or password not provided');
  }

  const password = await hashPassword(date.password);

  let user: IUserInstance = new User({
    ...date,
    password,
  });

  return user.save();
};

UserSchema.methods.token = function (): string {
  return generateToken({ id: this._id.toString(), email: this.email.toString() });
};

UserSchema.methods.verifyPassword = async function (password: string) {
  try {
    await checkPassword(this.password, password);
    return true;
  } catch (error) {
    throw new Http403Error({ code: 4 });
  }
};

const User: IUserModel = model<IUserInstance, IUserModel>(USER, UserSchema, USERS);

export default User;
