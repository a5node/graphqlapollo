import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

import { HttpApolloErrors } from '../errors/http-errors';

function IsTrue(property: string | unknown, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsTrue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      //принимает или функцию или класс
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.dir('--------1----------');
          console.dir(property); //  то что передаём первым аргументом в декоратор
          console.dir(validationOptions); //  то что вторым аргументом в декоратор
          console.dir('---------2---------');
          console.dir(object); // получает конструктор класса что пришёл (?)
          console.dir(propertyName); // название аргумента  в в классе
          console.dir('----------3--------');
          console.dir(value); // значение что пришло в запросе
          console.dir(args); // Список аргументов
          // {
          //   targetName: 'InputFindUser', // имя класса инпута из схемы
          //   property: 'id', // Название аргументом над которым повешен декоратор
          //   object: InputFindUser { ...},// название  инпута из схемы  и данные что пришли в него
          //   value: '61839b526e1e4466eef042e5', // значение что пришло в запросе
          //   constraints: [ ... ] // то что пришло из property
          //}
          console.dir('----------4--------');

          if (property) {
            //  throw new HttpApolloErrors({ messages: validationOptions?.message });
          }

          return true;
        },
      },
    });
  };
}
