type AnyConstructor<T = object> = new (...input: any[]) => T;

export function MixinClass<T extends AnyConstructor>(listClass: T[]): AnyConstructor {
  try {
    class base {}
    listClass.forEach(item => {
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
        let descriptor = Object.getOwnPropertyDescriptor(item.prototype, name);
        Object.defineProperty(base.prototype, name, <PropertyDescriptor & ThisType<any>>descriptor);
      });
    });
    return class extends base {};
  } catch (error) {
    throw error;
  }
}

export function applyMixins<T extends AnyConstructor>(ownerClass: T, listClass: T[]) {
  try {
    listClass.forEach(item => {
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
        let descriptor = Object.getOwnPropertyDescriptor(item.prototype, name);
        Object.defineProperty(ownerClass.prototype, name, <PropertyDescriptor & ThisType<any>>descriptor);
      });
    });
  } catch (error) {
    throw error;
  }
}
