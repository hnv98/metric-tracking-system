import { ConversionStrategy } from '../interfaces/conversion-strategy.interface';

export class TemperatureConversionStrategy implements ConversionStrategy {
  convertToBase(value: number, fromUnit: string): number {
    if (fromUnit === 'Celsius') {
      return value;
    }
    if (fromUnit === 'Fahrenheit') {
      return ((value - 32) * 5) / 9;
    }
    if (fromUnit === 'Kelvin') {
      return value - 273.15;
    }
    throw new Error('Unsupported temperature unit');
  }

  convertFromBase(value: number, toUnit: string): number {
    if (toUnit === 'Celsius') {
      return value;
    }
    if (toUnit === 'Fahrenheit') {
      return (value * 9) / 5 + 32;
    }
    if (toUnit === 'Kelvin') {
      return value + 273.15;
    }
    throw new Error('Unsupported temperature unit');
  }
}
