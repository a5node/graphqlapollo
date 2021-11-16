import { ObjectId } from 'mongoose';
import { Dictionary } from '../interface';

export interface IDefault {
  readonly id?: string | ObjectId;
  readonly _id?: string | ObjectId;
  readonly create_at: Date;
  readonly update_at: Date;
}

export interface ISort {
  create_at?: boolean | number;
  update_at?: boolean | number;
  price?: boolean | number;
}

export interface IComposer {
  skip?: number;
  limit?: number;
  sort?: Dictionary;
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
