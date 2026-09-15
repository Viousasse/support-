import React from "react";

export function Switch({label, checked, defaultChecked, disabled = false, onChange, className = ""}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => { if (disabled) return; const next = !on; setInternal(next); if (onChange) onChange(next); };
  return (
    <label className={["da-switch", className].filter(Boolean).join(" ")} onClick={toggle}>
      <span className={["da-switch__track", on && !disabled ? "da-switch__track--on" : "", disabled ? "da-switch__track--disabled" : ""].filter(Boolean).join(" ")}>
        <span className="da-switch__knob" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
