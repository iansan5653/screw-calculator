import FormItem from "components/FormItem";
import React from "react";
import "./styles.css";

interface Props {
  value: string;
  label: string;
}

export default function Output({ value, label }: Props): React.ReactElement {
  return (
    <FormItem label={label}>
      <output className="Output-value">{value}</output>
    </FormItem>
  );
}
