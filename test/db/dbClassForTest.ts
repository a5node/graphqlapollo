import { Dictionary, IComposer, IPrice } from '../../src/interface';

export class ReturnSort {
  create_at: any;
  update_at: any;
  price: any;

  constructor({ price, update_at, create_at }: Dictionary) {
    if (price) {
      this.price = price;
    }
    if (update_at) {
      this.update_at = update_at;
    }
    if (create_at) {
      this.create_at = create_at;
    }
  }
  get data(): Dictionary {
    return this;
  }
}

export class ReturnPrice {
  from: any;
  to: any;

  constructor({ from, to }: IPrice) {
    if (from) {
      this.from = from;
    }
    if (to) {
      this.to = to;
    }
  }

  get data(): Dictionary {
    return this;
  }
}
