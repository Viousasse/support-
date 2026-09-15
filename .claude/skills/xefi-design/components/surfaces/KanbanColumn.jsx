import React from "react";

/**
 * DailyUp KanbanColumn — a board column with a titled header, count, accent
 * bar and a vertical stack of cards (children). Use several side by side.
 */
export function KanbanColumn({
  title,
  count,
  accent = "var(--color-border-strong)",
  children,
  onAdd,
  style = {},
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", width: 280, flexShrink: 0,
      background: "var(--color-background-surface-sunken)", borderRadius: "var(--radius-lg-px)",
      border: "1px solid var(--color-border-subtle)", overflow: "hidden", ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderTop: `3px solid ${accent}` }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</span>
        {count != null && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 20, height: 20, padding: "0 6px", borderRadius: "var(--radius-pill-px)", background: "var(--color-background-surface)", color: "var(--color-text-secondary)", fontFamily: "var(--font-data)", fontSize: 11, fontWeight: 700 }}>{count}</span>}
        {onAdd && (
          <button type="button" aria-label="Ajouter" onClick={onAdd} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, border: "none", background: "transparent", color: "var(--color-icon-default)", cursor: "pointer", borderRadius: "var(--radius-sm-px)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "4px 10px 12px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * A compact card for use inside KanbanColumn.
 */
export function KanbanCard({ title, meta, footer, onClick, style = {} }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", flexDirection: "column", gap: 8, padding: 12,
      background: "var(--color-background-surface)", border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-md-px)", boxShadow: "var(--elevation-1)", cursor: onClick ? "pointer" : "default", ...style,
    }}>
      {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{title}</span>}
      {meta && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{meta}</span>}
      {footer && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>{footer}</div>}
    </div>
  );
}
