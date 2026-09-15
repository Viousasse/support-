import React from "react";

/**
 * DailyUp Timeline — vertical activity feed. items: [{ title, meta, icon?,
 * tone?, content? }]. A connector line links the dots; tone colors the dot.
 */
export function Timeline({ items = [], style = {} }) {
  const toneSkin = (tone) => ({
    neutral: { fg: "var(--color-icon-default)", bg: "var(--color-background-surface-sunken)" },
    brand:   { fg: "var(--color-brand-default)", bg: "var(--dailyup-colors-red-lighten-5)" },
    info:    { fg: "var(--dailyup-colors-blue-darken-1)", bg: "var(--dailyup-colors-blue-lighten-5)" },
    success: { fg: "var(--color-feedback-success-text)", bg: "var(--color-feedback-success-surface)" },
    warning: { fg: "var(--color-feedback-warning-text)", bg: "var(--color-feedback-warning-surface)" },
  }[tone] || { fg: "var(--color-icon-default)", bg: "var(--color-background-surface-sunken)" });

  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {items.map((it, i) => {
        const k = toneSkin(it.tone);
        const last = i === items.length - 1;
        return (
          <div key={i} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, flexShrink: 0, borderRadius: "var(--radius-pill-px)", background: k.bg, color: k.fg }}>
                {it.icon || <span style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor" }} />}
              </span>
              {!last && <span style={{ width: 2, flex: 1, minHeight: 18, background: "var(--color-border-default)" }} />}
            </div>
            <div style={{ paddingBottom: last ? 0 : 18, paddingTop: 5, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{it.title}</span>
                {it.meta && <span style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--color-text-secondary)" }}>{it.meta}</span>}
              </div>
              {it.content && <div style={{ marginTop: 2, fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{it.content}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
