import { ObjectId } from 'mongoose';

export interface IDefault {
  readonly id?: string | ObjectId;
  readonly _id?: string | ObjectId;
  readonly create_at: Date;
  readonly update_at: Date;
}

export interface IFindById {
  id: ObjectId;
}
