import { ConversionStrategy } from '../interfaces/conversion-strategy.interface';

export class DistanceConversionStrategy implements ConversionStrategy {
  private conversionRatesToBase = {
    yard_meter: 0.9144,
    inch_meter: 0.0254,
    centimeter_meter: 0.01,
    feet_meter: 0.3048,
  };

  private conversionRatesFromBase = {
    meter_yard: 1.09361,
    meter_inch: 39.3701,
    meter_centimeter: 100,
    meter_feet: 3.28084,
  };

  convertToBase(value: number, fromUnit: string): number {
    if (fromUnit === 'meter') {
      return value;
    }
    const key = `${fromUnit.toLowerCase()}_meter`;
    return value * (this.conversionRatesToBase[key] || 1);
  }

  convertFromBase(value: number, toUnit: string): number {
    if (toUnit === 'meter') {
      return value;
    }
    const key = `meter_${toUnit.toLowerCase()}`;
    return value * (this.conversionRatesFromBase[key] || 1);
  }
}
