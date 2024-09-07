import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DistanceUnit, MetricType, TemperatureUnit } from '../enums';

@ValidatorConstraint({ name: 'IsValidUnitForType', async: false })
export class IsValidUnitForType implements ValidatorConstraintInterface {
  validate(unit: DistanceUnit | TemperatureUnit, args: ValidationArguments) {
    const type = (args.object as any).type;
    if (
      type === MetricType.Distance &&
      Object.values(DistanceUnit).includes(unit as DistanceUnit)
    ) {
      return true;
    }
    if (
      type === MetricType.Temperature &&
      Object.values(TemperatureUnit).includes(unit as TemperatureUnit)
    ) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const type = (args.object as any).type;
    if (type === MetricType.Distance) {
      return `Unit must be one of the following: ${Object.values(DistanceUnit).join(', ')}`;
    }
    if (type === MetricType.Temperature) {
      return `Unit must be one of the following: ${Object.values(TemperatureUnit).join(', ')}`;
    }
    return 'Invalid unit for the given type';
  }
}
