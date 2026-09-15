import React from "react";

/**
 * DailyUp Progress — linear bar or circular ring. Determinate by `value`
 * (0–100) or omit for an indeterminate animation. Tone sets the fill color.
 */
export function Progress({
  value,
  variant = "linear",
  tone = "primary",
  size = 40,
  thickness = 4,
  showLabel = false,
  style = {},
}) {
  const indeterminate = value == null;
  const v = Math.max(0, Math.min(100, value || 0));
  const color = {
    primary: "var(--color-action-primary-default)",
    brand: "var(--color-brand-default)",
    success: "var(--color-feedback-success-text)",
    info: "var(--dailyup-colors-blue-darken-1)",
  }[tone] || "var(--color-action-primary-default)";

  if (variant === "circular") {
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    return (
      <span style={{ display: "inline-flex", position: "relative", width: size, height: size, ...style }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)", animation: indeterminate ? "du-spin 1.2s linear infinite" : "none" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-background-surface-sunken)" strokeWidth={thickness} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={indeterminate ? c * 0.7 : c * (1 - v / 100)} style={{ transition: indeterminate ? "none" : "stroke-dashoffset var(--motion-slow) var(--ease-standard)" }} />
        </svg>
        {showLabel && !indeterminate && <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-data)", fontSize: size * 0.28, fontWeight: 700, color: "var(--color-text-primary)" }}>{Math.round(v)}</span>}
        <style>{`@keyframes du-spin { to { transform: rotate(270deg); } }`}</style>
      </span>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", ...style }}>
      <div style={{ flex: 1, height: thickness + 2, borderRadius: "var(--radius-pill-px)", background: "var(--color-background-surface-sunken)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "var(--radius-pill-px)", background: color,
          width: indeterminate ? "40%" : v + "%",
          animation: indeterminate ? "du-indeterminate 1.4s var(--ease-standard) infinite" : "none",
          transition: indeterminate ? "none" : "width var(--motion-slow) var(--ease-standard)",
        }} />
      </div>
      {showLabel && !indeterminate && <span style={{ fontFamily: "var(--font-data)", fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)", minWidth: 36, textAlign: "right" }}>{Math.round(v)}%</span>}
      <style>{`@keyframes du-indeterminate { 0% { margin-left: -40%; } 100% { margin-left: 100%; } }`}</style>
    </div>
  );
}
