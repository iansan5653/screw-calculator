export const threadSystems = ["Inch", "Metric"] as const;

export type ThreadSystem = (typeof threadSystems)[number];
