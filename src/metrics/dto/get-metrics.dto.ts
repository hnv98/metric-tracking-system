import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { DistanceUnit, MetricType, TemperatureUnit } from 'src/common/enums';
import { IsValidUnitForType } from 'src/common/validators/is-valid-unit-for-type.validator';

export class GetMetricsDto {
  @ApiProperty({
    description: 'Type of the metrics',
    enum: MetricType,
    required: true,
  })
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty({
    description: 'Start date for filtering metrics',
    type: String,
    format: 'date',
    example: '2024-09-06T12:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'End date for filtering metrics',
    type: String,
    format: 'date',
    example: '2024-09-07T12:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Page number for pagination',
    type: Number,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page for pagination',
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({
    description: 'Unit of the metrics',
    enum: Object.values({ ...DistanceUnit, ...TemperatureUnit }),
  })
  @IsNotEmpty()
  @Validate(IsValidUnitForType)
  unit: DistanceUnit | TemperatureUnit;

  @ApiProperty({
    description: 'Get list metric by userId',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  userId: number;
}
