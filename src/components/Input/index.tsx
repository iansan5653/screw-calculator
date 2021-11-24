import React from "react";
import "./styles.css";

interface InputProps<T = string> {
  value: T;
  onChange: (value: T) => void;
}

interface SelectInputProps<T extends string> extends InputProps<T> {
  options: readonly T[];
}

interface NumberInputProps extends InputProps<number | null> {
  valueType: "number";
  units?: string;
  expectedDigits?: number;
}

interface StringInputProps extends InputProps<string> {
  valueType?: "string";
}

type Props<T extends string> =
  | SelectInputProps<T>
  | StringInputProps
  | NumberInputProps;

/**
 * Checks if `value` is a member of the union type `T` by checking if it is a member of `options`.
 */
const isValidOption = <T extends string>(
  value: string,
  options: readonly T[]
): value is T => {
  const optionsStrArr: readonly string[] = options; // widen the type of options array to allow includes call
  return optionsStrArr.includes(value);
};

/**
 * Parse integer or return null for invalid value.
 */
const parseIntOrNull = (value: string): number | null => {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

function SelectInput<T extends string>({
  options,
  value,
  onChange,
}: SelectInputProps<T>): React.ReactElement {
  if (options.length === 0) return <></>;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (isValidOption(value, options)) onChange(value);
  };

  return (
    <select
      className="Input Input_SelectInput"
      onChange={handleChange}
      value={value}
    >
      {options.map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function TextInput({
  value,
  onChange,
}: InputProps<string>): React.ReactElement {
  return (
    <input
      className="Input"
      onChange={(ev) => onChange(ev.target.value)}
      value={value ?? ""}
    />
  );
}

function NumberInput({
  value,
  onChange,
  units,
  expectedDigits,
}: NumberInputProps): React.ReactElement {
  const inputProps = {
    type: "number",
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
      onChange(parseIntOrNull(ev.target.value)),
    value: value ?? "",
    style: expectedDigits
      ? {
          width: `${expectedDigits + 2}ch`,
        }
      : undefined,
  };

  return units ? (
    <span className="Input">
      <input {...inputProps} />
      <span>{units}</span>
    </span>
  ) : (
    <input {...inputProps} className="Input" />
  );
}

export default function Input<T extends string>(
  props: Props<T>
): React.ReactElement {
  return "options" in props ? (
    <SelectInput {...props} />
  ) : "valueType" in props && props.valueType === "number" ? (
    <NumberInput {...props} />
  ) : (
    <TextInput {...props} />
  );
}
