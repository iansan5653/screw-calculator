import FormItem from "components/FormItem";
import Input from "components/Input";
import React from "react";
import "./styles.css";

export default function App(): React.ReactElement {
  const [value, setValue] = React.useState("");

  return (
    <div className="App">
      <div className="App-content">
        <header>
          <h1 className="App-title">Screw Calculator</h1>
        </header>
        <FormItem
          label="Input"
          input={<Input value={value} onChange={setValue} />}
        />
        <FormItem
          label="Input"
          input={<Input value={value} onChange={setValue} />}
        />
      </div>
    </div>
  );
}
