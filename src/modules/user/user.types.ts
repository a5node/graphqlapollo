import { IUserInstance, IInputCreateUser, IUserSchema, IUserDefault, IInputUpdateUser } from './user.interface';
import { InputFindUser, FindUser, InputUpdateUser, InputCreateUser } from './user.schema';
import { IAddOrRemove, IAddOrRemoveRole, IComposer, IFilter } from '../../interface';

export type TAddItemToUser = (data: IAddOrRemove) => Promise<FindUser | (IUserSchema & IUserDefault)>;
export type TCreateUser = (data: IInputCreateUser | InputCreateUser) => Promise<IUserSchema & IUserDefault>;
export type TUpdateUser = (
  data: IInputUpdateUser | InputUpdateUser,
) => Promise<FindUser | (IUserSchema & IUserDefault)>;
export type TFindUser = (data: InputFindUser) => Promise<FindUser | (IUserSchema & IUserDefault)>;

export type TAddOrRemoveRole = (data: IAddOrRemoveRole) => Promise<FindUser | (IUserSchema & IUserDefault)>;

export type TGetUsers = (data: IComposer & IFilter) => Promise<IUserInstance[]>;
