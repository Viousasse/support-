import React from "react";

export function Checkbox({label, checked, defaultChecked, disabled = false, onChange, className = ""}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isChecked = checked !== undefined ? checked : internal;
  const toggle = () => { if (disabled) return; const next = !isChecked; setInternal(next); if (onChange) onChange(next); };
  return (
    <label className={["da-check", disabled ? "da-check--disabled" : "", className].filter(Boolean).join(" ")} onClick={toggle}>
      <span className={"da-check__box" + (isChecked && !disabled ? " da-check__box--checked" : "")}>
        {isChecked ? (
          <svg className="da-check__tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        ) : null}
      </span>
      <span>{label}</span>
    </label>
  );
}
