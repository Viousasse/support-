import React from "react";

export function Input({label, value, defaultValue, placeholder = "", size = 40, error, disabled = false, icon = null, type = "text", onChange, id, className = "", ...rest}) {
  const [focus, setFocus] = React.useState(false);
  const boxCls = ["da-field__box", focus && !error ? "da-field__box--focus" : "", error ? "da-field__box--error" : "", disabled ? "da-field__box--disabled" : ""].filter(Boolean).join(" ");
  return (
    <div className={["da-field", "da-field--" + size, className].filter(Boolean).join(" ")}>
      {label ? <label className="da-field__label" htmlFor={id}>{label}</label> : null}
      <div className={boxCls}>
        <input id={id} className="da-field__input" type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={onChange} {...rest} />
        {icon ? <span className="da-field__adornment">{icon}</span> : null}
      </div>
      {error ? <span className="da-field__error">{error}</span> : null}
    </div>
  );
}
