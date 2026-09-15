import React from "react";

/**
 * DailyUp Counter — numeric stepper with minus / value / plus.
 */
export function Counter({
  value = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
  disabled = false,
  style = {},
}) {
  const set = (v) => { if (!disabled && onChange) onChange(Math.max(min, Math.min(max, v))); };
  const btn = (label, onClick, off) => (
    <button
      type="button" aria-label={label} disabled={disabled || off} onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32, flexShrink: 0, border: "none", background: "transparent",
        color: (disabled || off) ? "var(--color-icon-muted)" : "var(--color-icon-default)",
        cursor: (disabled || off) ? "not-allowed" : "pointer", borderRadius: "var(--radius-pill-px)",
      }}
    >
      {label === "Diminuer"
        ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
    </button>
  );

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      padding: "2px", border: "1px solid var(--color-border-default)",
      borderRadius: "var(--radius-pill-px)", background: "var(--color-background-surface)", ...style,
    }}>
      {btn("Diminuer", () => set(value - step), value <= min)}
      <span style={{
        minWidth: 28, textAlign: "center", fontFamily: "var(--font-data)",
        fontSize: "var(--text-body-md-size)", fontWeight: "var(--weight-medium)",
        color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums",
      }}>{value}</span>
      {btn("Augmenter", () => set(value + step), value >= max)}
    </div>
  );
}
