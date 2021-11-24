export const measurementSystems = ["Inch", "Metric"] as const;

export type MeasurementSystem = (typeof measurementSystems)[number];
