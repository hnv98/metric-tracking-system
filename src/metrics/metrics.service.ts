import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { Metric, MetricDocument } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversionStrategy, MetricsRes } from './interfaces';
import { MetricType, TimeUnit } from 'src/common/enums';
import {
  DistanceConversionStrategy,
  TemperatureConversionStrategy,
} from './strategies';
import { GetMetricsDto } from './dto/get-metrics.dto';
import { GetChartDataDto } from './dto/get-chart-data.dto';

@Injectable()
export class MetricsService {
  private strategy: ConversionStrategy;
  constructor(
    @InjectModel(Metric.name) private metricModel: Model<MetricDocument>,
  ) {}

  private setStrategy(type: MetricType) {
    if (type === MetricType.Distance) {
      this.strategy = new DistanceConversionStrategy();
    } else if (type === MetricType.Temperature) {
      this.strategy = new TemperatureConversionStrategy();
    } else {
      throw new Error('Invalid metric type');
    }
  }

  async createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
    const { type, value, unit } = createMetricDto;
    this.setStrategy(type);
    let baseUnit: string;

    if (type === MetricType.Distance) {
      baseUnit = 'meter';
    } else if (type === MetricType.Temperature) {
      baseUnit = 'celsius';
    } else {
      throw new Error('Invalid metric type');
    }

    const baseValue = this.strategy.convertToBase(value, unit);

    const createdMetric = new this.metricModel({
      ...createMetricDto,
      value: baseValue,
      unit: baseUnit,
    });

    const newMetric = await createdMetric.save();

    return Object.assign(newMetric, { value, unit });
  }

  async getMetrics(getMetricsDto: GetMetricsDto): Promise<MetricsRes> {
    const {
      type,
      startDate,
      endDate,
      userId,
      page = 1,
      limit = 10,
      unit,
    } = getMetricsDto;

    this.setStrategy(type);

    const query = this.metricModel.find({
      ...(type && { type }),
      ...(userId && { userId }),
      ...(startDate &&
        endDate && {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        }),
    });

    const [total, metrics] = await Promise.all([
      query.clone().countDocuments(),
      query
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
    ]);

    const results = metrics.map((metric) => {
      const { value } = metric;
      metric.value = this.strategy.convertFromBase(value, unit);
      metric.unit = unit;
      return metric;
    });

    return { total, results };
  }

  async getChartData(getChartDataDto: GetChartDataDto): Promise<Metric[]> {
    const { type, value, timeUnit, targetUnit, userId } = getChartDataDto;

    this.setStrategy(type);

    const startDate = new Date();

    if (timeUnit === TimeUnit.Month) {
      startDate.setMonth(startDate.getMonth() - value);
    } else {
      throw new Error('Invalid timeUnit');
    }

    const metrics = await this.metricModel.aggregate([
      {
        $match: {
          type: type,
          date: { $gte: startDate },
          ...(userId && { userId }),
        },
      },
      {
        $sort: { date: 1 },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          latestMetric: { $last: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestMetric' },
      },
    ]);

    if (targetUnit) {
      metrics.forEach((metric) => {
        const { value } = metric;
        metric.value = this.strategy.convertFromBase(value, targetUnit);
        metric.unit = targetUnit;
      });
    }

    return metrics;
  }
}
