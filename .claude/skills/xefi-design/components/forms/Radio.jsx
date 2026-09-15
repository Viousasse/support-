import React from "react";

export function Radio({label, checked = false, disabled = false, name, value, onChange, className = ""}) {
  return (
    <label className={["da-check", disabled ? "da-check--disabled" : "", className].filter(Boolean).join(" ")}
      onClick={() => { if (!disabled && onChange) onChange(value); }}>
      <span className={"da-radio__dot" + (checked && !disabled ? " da-radio__dot--checked" : "")} data-name={name} />
      <span>{label}</span>
    </label>
  );
}
