import React from "react";

/**
 * DailyUp DescriptionList — key/value detail rows, as used in detail panels and
 * drawers. items: [{ term, value }]. layout "rows" (label left, value right) or
 * "stacked" (label above value).
 */
export function DescriptionList({ items = [], layout = "rows", style = {} }) {
  return (
    <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: layout === "stacked" ? 14 : 0, ...style }}>
      {items.map((it, i) => (
        layout === "stacked" ? (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <dt style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-overline-size)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>{it.term}</dt>
            <dd style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)" }}>{it.value}</dd>
          </div>
        ) : (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "10px 0", borderBottom: i < items.length - 1 ? "1px solid var(--color-border-subtle)" : "none" }}>
            <dt style={{ width: 140, flexShrink: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", fontWeight: 600, color: "var(--color-text-secondary)" }}>{it.term}</dt>
            <dd style={{ margin: 0, flex: 1, fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)" }}>{it.value}</dd>
          </div>
        )
      ))}
    </dl>
  );
}
