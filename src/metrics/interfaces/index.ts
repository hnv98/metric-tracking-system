import { Metric } from '../schemas';

export * from './conversion-strategy.interface';

export type MetricsRes = {
  total: number;
  results: Metric[];
};
