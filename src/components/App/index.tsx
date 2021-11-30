import FormItem from "components/FormItem";
import Input from "components/Input";
import Output from "components/Output";
import calculateScrewLoads from "data/load_calculator";
import { MaterialName, materialNames, materials } from "data/materials";
import { screwSpecifications } from "data/screw_specifications";
import { ThreadSystem, threadSystems } from "data/thread_system";
import React from "react";
import "./styles.css";

interface ThreadSetting {
  threadSystem: ThreadSystem;
  threadSize: string;
}

const getDefaultThreadSetting = (
  threadSystem: ThreadSystem
): ThreadSetting => ({
  threadSystem,
  threadSize: Object.keys(screwSpecifications[threadSystem])[0],
});

// Override the unit to lbf (pound-force is not a valid 'simple unit' for JS)
const formatLbf = (lbf: number): string =>
  new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: "pound",
  })
    .formatToParts(lbf)
    .map(({ type, value }) => (type === "unit" ? "lbf" : value))
    .join("");

export default function App(): React.ReactElement {
  const [{ threadSystem, threadSize }, setThreadSetting] =
    React.useState<ThreadSetting>(getDefaultThreadSetting("Inch"));
  const setThreadSystem = (value: ThreadSystem) =>
    setThreadSetting(getDefaultThreadSetting(value));
  const setThreadSize = (value: string) =>
    setThreadSetting({ threadSystem, threadSize: value });

  const systemThreadSizes = React.useMemo(
    () => Object.keys(screwSpecifications[threadSystem]),
    [threadSystem]
  );

  const [material, setMaterial] = React.useState<MaterialName>("Steel");
  const [uts, setUts] = React.useState<number | null>(170000);
  const [fasteners, setFasteners] = React.useState<number | null>(1);
  const [fos, setFos] = React.useState<number | null>(3);

  const onMeasurementSystemChange = (value: ThreadSystem) => {
    setThreadSize(Object.keys(screwSpecifications[threadSystem])[0]);
    setThreadSystem(value);
  };

  const [tensileLoad, shearLoad] =
    uts !== null && fasteners !== null && fos !== null
      ? calculateScrewLoads(
          threadSystem,
          threadSize,
          uts,
          materials[material].shearStrengthFactor,
          fos,
          fasteners
        )
      : [null, null];

  return (
    <div className="App">
      <div className="App-content">
        <header>
          <h1 className="App-title">Bolt Load Calculator</h1>
        </header>
        <div className="App-inputs">
          <FormItem label="Thread System">
            <Input
              value={threadSystem}
              onChange={onMeasurementSystemChange}
              options={threadSystems}
            />
          </FormItem>
          <FormItem label="Size">
            <Input
              value={threadSize}
              onChange={setThreadSize}
              options={systemThreadSizes}
            />
          </FormItem>

          <FormItem label="Material">
            <Input
              options={materialNames}
              value={material}
              onChange={setMaterial}
            />
          </FormItem>

          <FormItem label="Material UTS">
            <Input
              valueType="number"
              value={uts}
              onChange={setUts}
              units="psi"
              expectedDigits={6}
              step={10000}
              min={0}
            />
          </FormItem>

          <FormItem label="Fasteners">
            <Input
              valueType="number"
              value={fasteners}
              onChange={setFasteners}
              expectedDigits={4}
              min={1}
            />
          </FormItem>

          <FormItem label="Factor of Safety">
            <Input
              valueType="number"
              value={fos}
              onChange={setFos}
              expectedDigits={4}
              min={1}
              step={0.05}
            />
          </FormItem>
        </div>
        <div className="App-inputs">
          {tensileLoad && (
            <Output label="Max Tensile Load" value={formatLbf(tensileLoad)} />
          )}

          {shearLoad && (
            <Output label="Max Shear Load" value={formatLbf(shearLoad)} />
          )}
        </div>
      </div>
    </div>
  );
}
