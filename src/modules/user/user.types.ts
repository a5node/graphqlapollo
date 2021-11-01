import {
  IUserInstance,
  IInputUpdateUser,
  IInputCreateUser,
  IUserSchema,
  IUserDefault,
  IInputFindUser,
} from './user.interface';
import { InputFindUser, FindUser } from './user.schema';

export type TRemoveItemFromUser = (input: {
  userId: string;
  where: string;
  itemId: string;
}) => Promise<IUserInstance | null>;

export type TAddItemToUser = (input: {
  userId: string;
  where: string;
  itemId: string;
}) => Promise<IUserInstance | null>;

export type TGetUser = () => Promise<IUserInstance[]>;
export type TFindUserByEmail = (email: string) => Promise<IUserInstance | null>;
export type TFindUserById = (id: string) => Promise<IUserInstance | null>;
export type TCreateUser = ({ email, password, name }: IInputCreateUser) => Promise<IUserSchema & IUserDefault>;
export type TUpdateUser = (input: IInputUpdateUser) => Promise<IUserInstance | null>;
export type TFindUser = ({ email, id }: InputFindUser) => Promise<FindUser | (IUserSchema & IUserDefault)>;
