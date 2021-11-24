import React from "react";
import "./styles.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputContainer({
  value, onChange,
}: Props): React.ReactElement {
  return <input className="Input" onChange={ev => onChange(ev.target.value)} value={value}/>;
}
