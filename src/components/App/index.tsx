import FormItem from "components/FormItem";
import Input from "components/Input";
import {
  MeasurementSystem,
  measurementSystems,
} from "data/measurement_systems";
import { screwSpecifications } from "data/screw_specifications";
import React from "react";
import "./styles.css";

export default function App(): React.ReactElement {
  const [measurementSystem, setMeasurementSysem] =
    React.useState<MeasurementSystem>(measurementSystems[0]);
  const [threadSize, setThreadSize] = React.useState<string | null>(null);
  const [uts, setUts] = React.useState<number | null>(null);

  const onMeasurementSystemChange = (value: MeasurementSystem) => {
    setThreadSize(null);
    setMeasurementSysem(value);
  };

  return (
    <div className="App">
      <div className="App-content">
        <header>
          <h1 className="App-title">Screw Calculator</h1>
        </header>
        <div className="App-inputs">
        <FormItem
          label="Measurement System"
          input={
            <Input
              value={measurementSystem}
              onChange={onMeasurementSystemChange}
              options={measurementSystems}
            />
          }
        />
        <FormItem
          label="Thread Size"
          input={
            <Input
              value={threadSize ?? ""}
              onChange={setThreadSize}
              options={Object.keys(screwSpecifications[measurementSystem])}
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
            />
          }
        /></div>
      </div>
    </div>
  );
}
