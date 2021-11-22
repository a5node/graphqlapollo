import { simileEnum, validateSelect, validateSort } from '../helpers/db.helper';
import { ESortDB } from '../interface';
import { TFilterDB, TSortDB, TSelectDB, TPriceDB } from './db.type';

export const filterDB: TFilterDB = data => {
  return {
    ...selectDB(data),
    sort: sortDB(data),
    price: priceDB(data),
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
    return { create_at: -1 };
  }
};

export const priceDB: TPriceDB = ({ price = {} }) => {
  try {
    const map = new Map(Object.entries(price.data));

    let priceList: any = {};

    for (let entry of map) {
      const { price } = priceList;

      if (entry[0] === 'from' && entry[1]) {
        if (!price) {
          priceList = { price: {} };
        }
        priceList = { price: { ...price, $gte: Number(entry[1]) } };
      }

      if (entry[0] === 'to' && entry[1]) {
        if (!price) {
          priceList = { price: {} };
        }
        priceList = { price: { ...price, $lte: Number(entry[1]) } };
      }
    }

    return priceList;
  } catch (error) {
    return {};
  }
};

export const selectDB: TSelectDB = ({ skip = 0, limit = 0 }) => {
  return {
    skip: validateSelect(skip ? (limit !== 0 ? limit * skip : skip) : 0),
    limit: validateSelect(limit ? limit : 0),
  };
};
