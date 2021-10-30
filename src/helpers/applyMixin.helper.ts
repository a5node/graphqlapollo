function applyMixins(derivedCtor: any, baseCtors: any[]) {
  try {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        let descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
        Object.defineProperty(derivedCtor.prototype, name, <PropertyDescriptor & ThisType<any>>descriptor);
      });
    });
  } catch (error) {
    throw error;
  }
}

export default applyMixins;
