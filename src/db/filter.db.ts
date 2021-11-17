import { simileEnum, validateSelect, validateSort } from '../helpers/db.helper';
import { ESortDB } from '../interface';
import { TFilterDB, TSortDB, TSelectDB } from './db.type';

export const filterDB: TFilterDB = data => {
  return {
    ...selectDB(data),
    ...sortDB(data),
  };
};

export const sortDB: TSortDB = ({ sort = {} }) => {
  try {
    const map = new Map(Object.entries(sort.data));

    let sortList = {};

    for (let entry of map) {
      if (simileEnum(ESortDB, entry[1])) {
        sortList = { ...sortList, [entry[0]]: validateSort(entry[1]) };
      }
    }

    return sortList;
  } catch (error) {
    return {};
  }
};

export const selectDB: TSelectDB = ({ skip = 0, limit = 0 }) => {
  return {
    skip: validateSelect(skip ? limit * skip : 0),
    limit: validateSelect(limit ? limit : 0),
  };
};
