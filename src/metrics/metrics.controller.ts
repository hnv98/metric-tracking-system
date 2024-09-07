import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { Metric } from './schemas';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMetricsDto } from './dto/get-metrics.dto';
import { GetChartDataDto } from './dto/get-chart-data.dto';
import { MetricsRes } from './interfaces';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new metric' })
  @ApiResponse({
    status: 201,
    description: 'The metric has been successfully created.',
    type: Metric,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createMetric(
    @Body() createMetricDto: CreateMetricDto,
  ): Promise<Metric> {
    return this.metricsService.createMetric(createMetricDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of metrics based on type and date range',
  })
  @ApiResponse({
    status: 200,
    description: 'List of metrics based on type and date range',
  })
  @HttpCode(HttpStatus.OK)
  async getMetrics(@Query() getMetricsDto: GetMetricsDto): Promise<MetricsRes> {
    return this.metricsService.getMetrics(getMetricsDto);
  }

  @Get('chart-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get chart data based on the type and specific time period',
  })
  @ApiResponse({
    status: 200,
    description: 'List of metrics based on type and specific time period',
    type: [Metric],
  })
  async getChartData(
    @Query() getChartDataDto: GetChartDataDto,
  ): Promise<Metric[]> {
    return this.metricsService.getChartData(getChartDataDto);
  }
}
