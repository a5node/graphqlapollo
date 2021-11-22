declare type MethodDecorator = <T>(
  target: Object, //объект, у которого данная функция была вызвана
  propertyKey: string | symbol, //имя функции
  descriptor: TypedPropertyDescriptor<T>, //дескриптор функции
) => TypedPropertyDescriptor<T> | void;

interface TypedPropertyDescriptor<T> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}

//https://habr.com/ru/post/494668/
// function LogTime() {
//     return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
//         const method = descriptor.value;
//         descriptor.value = function(...args) {
//             console.time(propertyName || 'LogTime');
//             const result = method.apply(this, args);
//             console.timeEnd(propertyName || 'LogTime');
//             return result;
//         };
//     };
// }
