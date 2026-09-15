import React from "react";

export function SearchInput({value, defaultValue, placeholder = "Rechercher…", size = 36, disabled = false, onChange, className = "", ...rest}) {
  const [focus, setFocus] = React.useState(false);
  const glyph = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
  return (
    <div className={["da-field", "da-field--" + size, className].filter(Boolean).join(" ")}>
      <div className={["da-field__box", focus ? "da-field__box--focus" : "", disabled ? "da-field__box--disabled" : ""].filter(Boolean).join(" ")}>
        <span className="da-field__adornment">{glyph}</span>
        <input className="da-field__input" type="search" value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={onChange} {...rest} />
      </div>
    </div>
  );
}
