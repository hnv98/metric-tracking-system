import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MetricType } from 'src/common/enums';

export type MetricDocument = Metric & Document;

@Schema({ timestamps: true, versionKey: false })
export class Metric {
  @Prop({ required: true, enum: MetricType })
  type: MetricType;

  @Prop({
    required: true,
  })
  unit: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  userId: number;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
