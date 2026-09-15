import React from "react";

/**
 * DailyUp Kbd — keyboard key indicator. Pass a combo string ("Ctrl+K") and it
 * splits into individual keys, or a single key as children.
 */
export function Kbd({ children, combo, style = {} }) {
  const keys = combo ? combo.split("+").map(k => k.trim()) : [children];
  const key = (k, i) => (
    <kbd key={i} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 20, height: 22, padding: "0 6px",
      background: "var(--color-background-surface)", border: "1px solid var(--color-border-default)",
      borderBottomWidth: 2, borderRadius: "var(--radius-sm-px)",
      fontFamily: "var(--font-data)", fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>{k}</kbd>
  );
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, ...style }}>
      {keys.map((k, i) => (
        <React.Fragment key={i}>
          {key(k, i)}
          {i < keys.length - 1 && <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--color-text-disabled)" }}>+</span>}
        </React.Fragment>
      ))}
    </span>
  );
}
