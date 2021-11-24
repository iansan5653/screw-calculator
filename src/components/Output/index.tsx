import React from "react";
import "./styles.css"

interface Props {
    value: string;
    label: string;
}

export default function Output({value, label}: Props): React.ReactElement {
    return <label className="Output">
        <span className="Output-label">{label}</span>
        <output className="Output-value">{value}</output>
    </label>
}
