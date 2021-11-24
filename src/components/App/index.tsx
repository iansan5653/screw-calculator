import FormItem from "components/FormItem";
import Input from "components/Input";
import Output from "components/Output";
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

  const onMeasurementSystemChange = (value: ThreadSystem) => {
    setThreadSize(systemThreadSizes[0]);
    setThreadSystem(value);
  };

  const inputIsComplete = threadSize !== null && uts !== null;

  return (
    <div className="App">
      <div className="App-content">
        <header>
          <h1 className="App-title">Screw Calculator</h1>
        </header>
        <div className="App-inputs">
          <FormItem
            label="Thread System"
            input={
              <Input
                value={threadSystem}
                onChange={onMeasurementSystemChange}
                options={threadSystems}
              />
            }
          />
          <FormItem
            label="Size"
            input={
              <Input
                value={threadSize}
                onChange={setThreadSize}
                options={systemThreadSizes}
              />
            }
          />
          <FormItem
            label="Material UTS"
            input={
              <Input
                valueType="number"
                value={uts}
                onChange={setUts}
                units="psi"
                expectedDigits={6}
              />
            }
          />
        </div>
        {inputIsComplete && (
          <div className="App-inputs">
            <Output label="Max Tensile Load" value="756 lb" />

            <Output label="Max Shear Load" value="1200 lb" />
          </div>
        )}
      </div>
    </div>
  );
}
