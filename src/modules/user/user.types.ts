import { IUserInstance, IInputUpdateUser, IInputCreateUser, IUserSchema, IUserDefault } from './user.interface';

export type TRemoveItemFromUser = (input: {
  userId: string | number;
  where: string;
  itemId: string | number;
}) => Promise<IUserInstance | null>;

export type TAddItemToUser = (input: {
  userId: string | number;
  where: string;
  itemId: string | number;
}) => Promise<IUserInstance | null>;

export type TGetAllUser = () => Promise<IUserInstance[] | null>;
export type TFindUserByEmail = (email: string) => Promise<IUserInstance | null>;
export type TFindUserById = (id: string) => Promise<IUserInstance | null>;
export type TCreateUser = ({ email, password, name }: IInputCreateUser) => Promise<IUserSchema & IUserDefault>;
export type TUpdateUser = (input: IInputUpdateUser) => Promise<IUserInstance | null>;
