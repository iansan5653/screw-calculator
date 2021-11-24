import FormItem from "components/FormItem";
import Input from "components/Input";
import { screwSpecifications } from "data/screw_specifications";
import { ThreadSystem, threadSystems } from "data/thread_system";
import React from "react";
import "./styles.css";

export default function App(): React.ReactElement {
  const [threadSystem, setThreadSystem] = React.useState<ThreadSystem>(
    threadSystems[0]
  );
  const [threadSize, setThreadSize] = React.useState<string | null>(null);
  const [uts, setUts] = React.useState<number | null>(null);

  const onMeasurementSystemChange = (value: ThreadSystem) => {
    setThreadSize(null);
    setThreadSystem(value);
  };

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
                value={threadSize ?? ""}
                onChange={setThreadSize}
                options={Object.keys(screwSpecifications[threadSystem])}
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
      </div>
    </div>
  );
}
