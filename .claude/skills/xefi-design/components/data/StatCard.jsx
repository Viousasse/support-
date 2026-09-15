import React from "react";

/**
 * DailyUp StatCard — a KPI tile: label, big value, optional delta trend and a
 * leading icon chip. Trend "up" is green, "down" red (direction, not sentiment).
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  icon,
  tone = "neutral",
  style = {},
}) {
  const chip = {
    neutral: { fg: "var(--color-icon-default)", bg: "var(--color-background-surface-sunken)" },
    brand:   { fg: "var(--color-brand-default)", bg: "var(--dailyup-colors-red-lighten-5)" },
    info:    { fg: "var(--dailyup-colors-blue-darken-1)", bg: "var(--dailyup-colors-blue-lighten-5)" },
    success: { fg: "var(--color-feedback-success-text)", bg: "var(--color-feedback-success-surface)" },
  }[tone] || { fg: "var(--color-icon-default)", bg: "var(--color-background-surface-sunken)" };

  const trendColor = trend === "up" ? "var(--color-feedback-success-text)" : trend === "down" ? "var(--color-feedback-error-text)" : "var(--color-text-secondary)";

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 12, padding: 20,
      background: "var(--color-background-surface)", border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-lg-px)", boxShadow: "var(--elevation-card)", ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", fontWeight: 600, color: "var(--color-text-secondary)" }}>{label}</span>
        {icon && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-md-px)", background: chip.bg, color: chip.fg }}>{icon}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, lineHeight: 1, color: "var(--color-text-primary)" }}>{value}</span>
        {delta != null && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: "var(--font-data)", fontSize: 13, fontWeight: 700, color: trendColor }}>
            {trend && (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: trend === "down" ? "rotate(180deg)" : "none" }}>
                <path d="M8 13V3M8 3l-4 4M8 3l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
