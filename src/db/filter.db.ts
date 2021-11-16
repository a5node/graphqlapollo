import { IComposer } from '../interface/default.interface';

enum FILTER {
  FALSE = 1, // -1  - от большого к меньшему
  TRUE = -1, //  1  - от меньшего к большему
  NOTHING = 0, //  0  - ничего не делать
}

type TFilterDB = (data: IComposer) => { skip: number; limit: number };

const validateFilterBoolean = (value: boolean | undefined | null | number): FILTER =>
  Math.round(Number(value ? 1 : value === false ? -1 : 0));

const validateFilterNumber = (value: number | null | undefined): number => Math.round(Number(value ? value : 0));

export const filterDB: TFilterDB = ({ sort, skip, limit = 0 }) => {
  return {
    // sort: sort
    //   ? {
    //       create_at: validateFilterBoolean(sort?.create_at),
    //       update_at: validateFilterBoolean(sort?.update_at),
    //       price: validateFilterBoolean(sort?.price),
    //     }
    //   : {},
    skip: validateFilterNumber(skip ? limit * skip : 0),
    limit: validateFilterNumber(limit ? limit : 0),
  };
};
