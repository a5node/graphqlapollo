// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Dictionary<V = any> {
  [key: string]: V;
}

export interface Duplicator<Element> {
  Element: Element;
}

export type AnyFunction<T = any> = (...input: any[]) => T;
export type AnyConstructor<T = object> = new (...input: any[]) => T;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

//-----------------------------------------------------

// const SampleMixin2Lambda = <T extends AnyConstructor<object>>(base: T) => class SampleMixin2 extends base {};
// class SampleMixin2 extends SampleMixin2Lambda(Object) {}

//https://www.bryntum.com/blog/the-mixin-pattern-in-typescript-all-you-need-to-know-part-2/
