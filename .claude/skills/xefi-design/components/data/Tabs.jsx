import React from "react";

export function Tabs({tabs = [], value, onChange, className = ""}) {
  const [internal, setInternal] = React.useState(tabs.length ? (typeof tabs[0] === "string" ? tabs[0] : tabs[0].value) : null);
  const current = value !== undefined ? value : internal;
  const valueOf = (t) => (typeof t === "string" ? t : t.value);
  const labelOf = (t) => (typeof t === "string" ? t : t.label);
  return (
    <div className={["da-tabs", className].filter(Boolean).join(" ")} role="tablist">
      {tabs.map((t, i) => (
        <button key={i} role="tab" aria-selected={valueOf(t) === current}
          className={"da-tab" + (valueOf(t) === current ? " da-tab--active" : "")}
          onClick={() => { setInternal(valueOf(t)); if (onChange) onChange(valueOf(t)); }}>{labelOf(t)}</button>
      ))}
    </div>
  );
}
