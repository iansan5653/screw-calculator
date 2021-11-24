import { screwSpecifications } from "./screw_specifications";
import { ThreadSystem } from "./thread_system";

export default function calculateScrewLoads(
  threadSystem: ThreadSystem,
  threadSize: string,
  tensileStrength: number,
  factorOfSafety = 1,
  fastenerCount = 1
): [tensile: number, shear: number] {
  const { minorDiameter } = screwSpecifications[threadSystem][threadSize];
  const area = Math.PI * (minorDiameter / 2) ** 2;

  const factoredTensileStrength =
    (tensileStrength * fastenerCount) / factorOfSafety;
  const tensileLoad = factoredTensileStrength * area;

  // Note this is a conservative estimate - we could ask for the material type to get a more accurate estimate
  // see https://en.wikipedia.org/wiki/Shear_strength#Comparison
  const shearStrength = 0.6 * factoredTensileStrength;
  const shearLoad = shearStrength * area;

  return [Math.round(tensileLoad), Math.round(shearLoad)];
}
