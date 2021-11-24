import React from "react";
import "./styles.css";

interface Props {
  label?: string;
  children: React.ReactElement;
}

export default function FormItem({ children: input, label }: Props): React.ReactElement {
  return label ? (
    <label className="FormItem">
      <span className="FormItem-label">{label}</span>
      {input}
    </label>
  ) : (
    <span className="FormItem">{input}</span>
  );
}
