import React from "react";

/**
 * DailyUp Slider — single-value range slider with a black fill and round thumb.
 */
export function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  showValue = false,
  style = {},
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", ...style }}>
      <div style={{ position: "relative", flex: 1, height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, borderRadius: "var(--radius-pill-px)", background: "var(--color-background-surface-sunken)" }} />
        <div style={{ position: "absolute", left: 0, width: pct + "%", height: 4, borderRadius: "var(--radius-pill-px)", background: disabled ? "var(--color-action-primary-disabled)" : "var(--color-action-primary-default)" }} />
        <div style={{ position: "absolute", left: `calc(${pct}% - 9px)`, width: 18, height: 18, borderRadius: "var(--radius-pill-px)", background: "var(--dailyup-colors-white)", border: `2px solid ${disabled ? "var(--color-action-primary-disabled)" : "var(--color-action-primary-default)"}`, boxShadow: "var(--elevation-1)", pointerEvents: "none" }} />
        <input type="range" min={min} max={max} step={step} value={value} disabled={disabled}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
          style={{ position: "absolute", left: 0, right: 0, width: "100%", height: 20, margin: 0, opacity: 0, cursor: disabled ? "not-allowed" : "pointer" }} />
      </div>
      {showValue && <span style={{ fontFamily: "var(--font-data)", fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", minWidth: 36, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{value}</span>}
    </div>
  );
}
