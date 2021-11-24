export interface Material {
  shearStrengthFactor?: number;
}

// Ref: https://roymech.org/Useful_Tables/Matter/shear_tensile.html
// TODO: Find an official standard for this
export const materials = {
  Steel: {
    shearStrengthFactor: 0.75,
  },
  "Ductile iron": {
    shearStrengthFactor: 0.9,
  },
  "Malleable iron": {
    shearStrengthFactor: 1,
  },
  "Wrought iron": {
    shearStrengthFactor: 0.83,
  },
  "Cast iron": {
    shearStrengthFactor: 1.3,
  },
  "Copper / copper alloy": {
    shearStrengthFactor: 0.65,
  },
  Aluminum: {
    shearStrengthFactor: 0.65,
  },
  Other: {
    shearStrengthFactor: undefined,
  },
} as const;

export type MaterialName = keyof typeof materials;
export const materialNames: MaterialName[] = Object.keys(
  materials
) as MaterialName[];
