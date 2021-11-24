import { ThreadSystem } from "./thread_system";

export interface ScrewSpecification {
  minorDiameter: number;
}

const mmToInch = (mm: number): number => mm * 0.0393701;

// It's mildly less performant to calculate these on load instead of save the value in inches in the first place
// but it's more maintainable to keep it in mm here.
export const metricScrewSpecifications = {
  M1: { minorDiameter: mmToInch(0.693) },
  "M1.1": { minorDiameter: mmToInch(0.793) },
  "M1.2": { minorDiameter: mmToInch(0.893) },
  "M1.4": { minorDiameter: mmToInch(1.032) },
  "M1.6": { minorDiameter: mmToInch(1.171) },
  "M1.8": { minorDiameter: mmToInch(1.371) },
  M2: { minorDiameter: mmToInch(1.509) },
  "M2.2": { minorDiameter: mmToInch(1.648) },
  "M2.5": { minorDiameter: mmToInch(1.948) },
  M3: { minorDiameter: mmToInch(2.387) },
  "M3.5": { minorDiameter: mmToInch(2.764) },
  M4: { minorDiameter: mmToInch(3.141) },
  "M4.5": { minorDiameter: mmToInch(3.58) },
  M5: { minorDiameter: mmToInch(4.019) },
  M6: { minorDiameter: mmToInch(4.773) },
  M7: { minorDiameter: mmToInch(5.773) },
  M8: { minorDiameter: mmToInch(6.466) },
  M9: { minorDiameter: mmToInch(7.466) },
  M10: { minorDiameter: mmToInch(8.16) },
  M11: { minorDiameter: mmToInch(9.16) },
  M12: { minorDiameter: mmToInch(9.853) },
  M14: { minorDiameter: mmToInch(11.546) },
  M16: { minorDiameter: mmToInch(13.546) },
  M18: { minorDiameter: mmToInch(14.933) },
  M20: { minorDiameter: mmToInch(16.933) },
  M22: { minorDiameter: mmToInch(18.933) },
  M24: { minorDiameter: mmToInch(20.319) },
  M27: { minorDiameter: mmToInch(23.319) },
  M30: { minorDiameter: mmToInch(25.706) },
  M33: { minorDiameter: mmToInch(28.706) },
  M36: { minorDiameter: mmToInch(31.093) },
  M39: { minorDiameter: mmToInch(34.093) },
  M42: { minorDiameter: mmToInch(36.479) },
  M45: { minorDiameter: mmToInch(39.479) },
  M48: { minorDiameter: mmToInch(41.866) },
} as const;
export type MetricScrewName = keyof typeof metricScrewSpecifications;

export const inchScrewSpecifications = {
  "1-64": { minorDiameter: 0.0544 },
  "2-56": { minorDiameter: 0.0648 },
  "3-48": { minorDiameter: 0.0741 },
  "4-40": { minorDiameter: 0.0822 },
  "5-40": { minorDiameter: 0.0952 },
  "6-32": { minorDiameter: 0.1008 },
  "8-32": { minorDiameter: 0.1268 },
  "10-24": { minorDiameter: 0.1404 },
  "12-24": { minorDiameter: 0.1664 },
  '1/4"-20': { minorDiameter: 0.1905 },
  '5/16"-18': { minorDiameter: 0.2464 },
  '3/8"-16': { minorDiameter: 0.3005 },
  '7/16"-14': { minorDiameter: 0.3525 },
  '1/2"-13': { minorDiameter: 0.4084 },
  '9/16"-12': { minorDiameter: 0.4633 },
  '5/8"-11': { minorDiameter: 0.5168 },
  '3/4"-10': { minorDiameter: 0.6309 },
  '7/8"-9': { minorDiameter: 0.7427 },
  '1"-8': { minorDiameter: 0.8512 },
  '1-1/8"-7': { minorDiameter: 0.9549 },
  '1 1/4"-7': { minorDiameter: 1.0799 },
  '1-3/8"-6': { minorDiameter: 1.1766 },
  '1 1/2"-6': { minorDiameter: 1.3016 },
  '1 3/4"-5': { minorDiameter: 1.5119 },
  '2"-4.5': { minorDiameter: 1.7353 },
  '2 1/4"-4.5': { minorDiameter: 1.9853 },
  '2 1/2"-4': { minorDiameter: 2.2023 },
  '2 3/4"-4': { minorDiameter: 2.4523 },
  '3"-4': { minorDiameter: 2.7023 },
  '3 1/4"-4': { minorDiameter: 2.9523 },
  '3 1/2"-4': { minorDiameter: 3.2023 },
  '3 3/4"-4': { minorDiameter: 3.4523 },
  '4"-4': { minorDiameter: 3.7023 },
};
export type EnglishScrewName = keyof typeof metricScrewSpecifications;

export const screwSpecifications: Readonly<
  Record<ThreadSystem, Record<string, ScrewSpecification>>
> = {
  Inch: inchScrewSpecifications,
  Metric: metricScrewSpecifications,
};
