import React from "react";

/**
 * DailyUp Drawer — side sheet that slides in over a dimmed overlay. `side`
 * picks the edge; header (title + close), body (children) and optional footer.
 */
export function Drawer({
  open = false,
  title,
  children,
  footer,
  onClose,
  side = "right",
  width = 420,
  style = {},
}) {
  const off = side === "right" ? { right: 0 } : { left: 0 };
  const hidden = side === "right" ? "translateX(100%)" : "translateX(-100%)";

  return (
    <div aria-hidden={!open} style={{
      position: "fixed", inset: 0, zIndex: 100, pointerEvents: open ? "auto" : "none",
    }}>
      {/* scrim */}
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(4,4,4,0.46)",
        opacity: open ? 1 : 0, transition: "opacity var(--motion-normal) var(--ease-standard)",
      }} />
      {/* panel */}
      <div role="dialog" aria-modal="true" style={{
        position: "absolute", top: 0, bottom: 0, ...off, width: "100%", maxWidth: width,
        display: "flex", flexDirection: "column", background: "var(--color-background-surface-raised)",
        boxShadow: "var(--elevation-overlay)",
        transform: open ? "translateX(0)" : hidden,
        transition: "transform var(--motion-slow) var(--ease-standard)", ...style,
      }}>
        {(title || onClose) && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 20px", borderBottom: "1px solid var(--color-border-subtle)" }}>
            {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-h3-size)", fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</span>}
            {onClose && (
              <button type="button" aria-label="Fermer" onClick={onClose} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, border: "none", background: "transparent", color: "var(--color-icon-default)", cursor: "pointer", borderRadius: "var(--radius-pill-px)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            )}
          </div>
        )}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, padding: "14px 20px", borderTop: "1px solid var(--color-border-subtle)" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
