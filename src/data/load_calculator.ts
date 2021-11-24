import { screwSpecifications } from "./screw_specifications";
import { ThreadSystem } from "./thread_system";

export default function calculateScrewLoads(
  threadSystem: ThreadSystem,
  threadSize: string,
  tensileStrength: number,
  shearStrengthFactor = 0.6,
  factorOfSafety = 1,
  fastenerCount = 1
): [tensile: number, shear: number] {
  const { minorDiameter } = screwSpecifications[threadSystem][threadSize];
  const area = Math.PI * (minorDiameter / 2) ** 2;

  const factoredTensileStrength =
    (tensileStrength * fastenerCount) / factorOfSafety;
  const tensileLoad = factoredTensileStrength * area;

  const shearStrength = shearStrengthFactor * factoredTensileStrength;
  const shearLoad = shearStrength * area;

  return [Math.round(tensileLoad), Math.round(shearLoad)];
}
