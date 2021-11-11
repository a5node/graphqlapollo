import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { SchemaDB } from '../interface/enum.interface';

// SchemaDB.some(role => role === VISITOR)
export function IsSchemaDB(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsSchemaDB',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          console.dir('value');
          console.dir(value);
          console.dir(args);
          console.dir(relatedValue);
          console.dir(validationOptions);
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            Object.values(SchemaDB).some(schema => schema === property)
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
