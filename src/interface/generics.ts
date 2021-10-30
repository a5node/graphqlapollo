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

export function Mixin<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {};
}

//-----------------------------------------------------

// const SampleMixin2Lambda = <T extends AnyConstructor<object>>(base: T) => class SampleMixin2 extends base {};
// class SampleMixin2 extends SampleMixin2Lambda(Object) {}

// export function Mixin<Mixin>([], base: AnyConstructor) {
//   return class FileSpecResource extends base {};
// }

// class FileSpecResource extends Mixin(
//   [FileSpec, Resource],
//   (base: AnyConstructor<FileSpec & Resource, typeof FileSpec & typeof Resource>) => class FileSpecResource extends base {}
//   ) {}
//https://www.bryntum.com/blog/the-mixin-pattern-in-typescript-all-you-need-to-know-part-2/
