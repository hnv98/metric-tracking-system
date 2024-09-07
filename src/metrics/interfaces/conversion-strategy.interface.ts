export interface ConversionStrategy {
  convertToBase(value: number, fromUnit: string): number;
  convertFromBase(value: number, toUnit: string): number;
}
