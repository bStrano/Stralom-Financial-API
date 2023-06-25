import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isHexadecimalWithHash', async: false })
export class IsHexadecimalWithHashConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  validate(value: any, args: ValidationArguments): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    return /^#[0-9A-Fa-f]{6}$/.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid hexadecimal string with a '#' prefix.`;
  }
}
export function IsHexadecimalWithHash(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isHexadecimalWithHash',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsHexadecimalWithHashConstraint,
    });
  };
}
