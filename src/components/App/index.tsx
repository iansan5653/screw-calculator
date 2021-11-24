import FormItem from "components/FormItem";
import Input from "components/Input";
import Output from "components/Output";
import calculateScrewLoads from "data/load_calculator";
import { screwSpecifications } from "data/screw_specifications";
import { ThreadSystem, threadSystems } from "data/thread_system";
import React from "react";
import "./styles.css";

export default function App(): React.ReactElement {
  const [threadSystem, setThreadSystem] = React.useState<ThreadSystem>(
    threadSystems[0]
  );
  const systemThreadSizes = React.useMemo(
    () => Object.keys(screwSpecifications[threadSystem]),
    [threadSystem]
  );
  const [threadSize, setThreadSize] = React.useState<string>(
    systemThreadSizes[0]
  );
  const [uts, setUts] = React.useState<number | null>(null);
  const [fasteners, setFasteners] = React.useState<number | null>(1);
  const [fos, setFos] = React.useState<number | null>(3.01);

  const onMeasurementSystemChange = (value: ThreadSystem) => {
    setThreadSize(systemThreadSizes[0]);
    setThreadSystem(value);
  };

  const [tensileLoad, shearLoad] =
    uts !== null && fasteners !== null && fos !== null
      ? calculateScrewLoads(threadSystem, threadSize, uts, fos, fasteners)
      : [null, null];

  return (
    <div className="App">
      <div className="App-content">
        <header>
          <h1 className="App-title">Screw Calculator</h1>
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
            <Output label="Max Tensile Load" value={`${tensileLoad} lb`} />
          )}

          {shearLoad && (
            <Output label="Max Shear Load" value={`${shearLoad} lb`} />
          )}
        </div>
      </div>
    </div>
  );
}
