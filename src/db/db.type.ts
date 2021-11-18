import { IComposer, Dictionary } from '../interface';
import { ISelectDB, IFilterDB } from './db.interface';

export type TFilterDB = (data: IComposer) => IFilterDB | Dictionary;
export type TSelectDB = (data: IComposer) => ISelectDB;
export type TSortDB = (data: IComposer) => Dictionary;
export type TPriceDB = (data: IComposer) => Dictionary;
