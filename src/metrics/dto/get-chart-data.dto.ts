import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  DistanceUnit,
  MetricType,
  TemperatureUnit,
  TimeUnit,
} from 'src/common/enums';
import { IsValidUnitForType } from 'src/common/validators/is-valid-unit-for-type.validator';
import { Transform } from 'class-transformer';

export class GetChartDataDto {
  @ApiProperty({
    description: 'Type of the metric',
    enum: MetricType,
    required: true,
  })
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty({ description: 'Number of time periods', required: true })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  value: number;

  @ApiProperty({
    enum: TimeUnit,
    description: 'Unit of time period',
    required: true,
  })
  @IsEnum(TimeUnit)
  timeUnit: TimeUnit;

  @ApiProperty({
    description: 'Unit of the metrics',
    enum: Object.values({ ...DistanceUnit, ...TemperatureUnit }),
  })
  @IsNotEmpty()
  @Validate(IsValidUnitForType)
  targetUnit: DistanceUnit | TemperatureUnit;

  @ApiProperty({
    description: 'Get chart data by userId',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  userId: number;
}
