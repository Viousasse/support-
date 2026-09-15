import React from "react";

/**
 * DailyUp Divider — hairline separator. Horizontal (default) or vertical;
 * optional centered label for horizontal.
 */
export function Divider({ orientation = "horizontal", label, style = {} }) {
  if (orientation === "vertical") {
    return <span style={{ display: "inline-block", width: 1, alignSelf: "stretch", minHeight: 16, background: "var(--color-border-default)", ...style }} />;
  }
  if (label) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", ...style }}>
        <span style={{ flex: 1, height: 1, background: "var(--color-border-subtle)" }} />
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption-size)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: "var(--color-border-subtle)" }} />
      </div>
    );
  }
  return <div style={{ width: "100%", height: 1, background: "var(--color-border-subtle)", ...style }} />;
}
