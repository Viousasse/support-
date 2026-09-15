import React from "react";

/**
 * DailyUp NumberTag — the "123" element: a compact bold numeric chip used as a
 * leading/trailing key, count or list index. Roboto tabular digits.
 */
export function NumberTag({
  value = 0,
  variant = "boxed",
  tone = "neutral",
  size = "md",
  style = {},
  ...rest
}) {
  const sizes = {
    xs: { h: 16, px: 4, font: 10 },
    sm: { h: 20, px: 6, font: 11 },
    md: { h: 24, px: 7, font: 13 },
    lg: { h: 28, px: 8, font: 14 },
    xl: { h: 34, px: 10, font: 18 },
  };
  const s = sizes[size] || sizes.md;
  const tones = {
    neutral: { fg: "var(--color-text-primary)", bg: "var(--color-background-surface-sunken)" },
    brand:   { fg: "var(--color-text-on-action)", bg: "var(--color-brand-default)" },
    dark:    { fg: "var(--color-text-on-action)", bg: "var(--color-action-primary-default)" },
  };
  const t = tones[tone] || tones.neutral;

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    minWidth: s.h, height: s.h, padding: `0 ${s.px}px`,
    fontFamily: "var(--font-data)", fontWeight: 700, fontSize: s.font,
    fontVariantNumeric: "tabular-nums", lineHeight: 1, letterSpacing: "0.02em",
  };
  const skin = variant === "plain"
    ? { color: t.bg === "var(--color-background-surface-sunken)" ? "var(--color-text-primary)" : t.bg, background: "transparent" }
    : { color: t.fg, background: t.bg, borderRadius: "var(--radius-sm-px)" };

  return <span style={{ ...base, ...skin, ...style }} {...rest}>{value}</span>;
}
