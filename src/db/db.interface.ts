import { Dictionary, ESortDB } from '../interface';
import { ObjectId } from 'mongoose';

export interface ISelectDB {
  skip: number;
  limit: number;
}

export interface IFilterDB extends ISelectDB, Dictionary {}

export interface DictionarySort<V = ESortDB> {
  [key: string]: V;
}

export interface IDefault {
  readonly id?: string | ObjectId;
  readonly _id?: string | ObjectId;
  readonly create_at: Date;
  readonly update_at: Date;
}

export interface IPrice {
  from?: number;
  to?: number;
}

export interface IComposer {
  skip?: number;
  limit?: number;
  sort?: Dictionary;
  price?: Dictionary;
}

export interface IFilter {
  filter?: IComposer;
}

export interface IFindById extends IFilter {
  id: ObjectId;
}

export interface IAddOrRemove {
  id: ObjectId;
  where: string;
  itemId: ObjectId[];
}
