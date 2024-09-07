import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsEnum,
  Validate,
} from 'class-validator';
import { DistanceUnit, MetricType, TemperatureUnit } from 'src/common/enums';
import { IsValidUnitForType } from 'src/common/validators/is-valid-unit-for-type.validator';

export class CreateMetricDto {
  @ApiProperty({
    description: 'Type of the metric',
    enum: MetricType,
  })
  @IsNotEmpty()
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty({
    description: 'Date of the metric',
    example: '2024-09-06T14:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Value of the metric',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Unit of the metric',
    enum: Object.values({ ...DistanceUnit, ...TemperatureUnit }),
  })
  @IsNotEmpty()
  @Validate(IsValidUnitForType)
  unit: DistanceUnit | TemperatureUnit;

  @ApiProperty({
    description: 'userId of the user who created the metric',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
