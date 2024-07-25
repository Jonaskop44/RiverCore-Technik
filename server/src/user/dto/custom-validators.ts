// custom-validators.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Designation } from '@prisma/client';

export function IsCompanyNameRequired(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCompanyNameRequired',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const dto = args.object as any;
          return (
            dto.designation !== Designation.COMPANY ||
            (dto.designation === Designation.COMPANY && value)
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'companyName must be provided when designation is COMPANY';
        },
      },
    });
  };
}
