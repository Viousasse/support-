import React from "react";

export function Select({label, options = [], value, placeholder = "Sélectionnez…", size = 40, disabled = false, onChange, className = ""}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(value);
  const current = value !== undefined ? value : internal;
  const selected = options.find((o) => (typeof o === "string" ? o : o.value) === current);
  const labelOf = (o) => (typeof o === "string" ? o : o.label);
  const valueOf = (o) => (typeof o === "string" ? o : o.value);
  const pick = (o) => { setInternal(valueOf(o)); setOpen(false); if (onChange) onChange(valueOf(o)); };
  const caret = (
    <svg className={"da-select__caret" + (open ? " da-select__caret--open" : "")} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
  );
  return (
    <div className={["da-select", className].filter(Boolean).join(" ")}>
      <div className={["da-field", "da-field--" + size].join(" ")}>
        {label ? <span className="da-field__label">{label}</span> : null}
        <div className={["da-field__box", open ? "da-field__box--focus" : "", disabled ? "da-field__box--disabled" : ""].filter(Boolean).join(" ")}
          role="button" tabIndex={0} onClick={() => !disabled && setOpen(!open)}>
          <span className="da-field__input" style={{color: selected ? "var(--text-body)" : "var(--text-placeholder)"}}>{selected ? labelOf(selected) : placeholder}</span>
          {caret}
        </div>
      </div>
      {open ? (
        <div className="da-select__menu" role="listbox">
          {options.map((o, i) => (
            <div key={i} role="option" aria-selected={valueOf(o) === current}
              className={"da-select__option" + (valueOf(o) === current ? " da-select__option--active" : "")}
              onClick={() => pick(o)}>{labelOf(o)}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
