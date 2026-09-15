import React from "react";

/**
 * DailyUp Modal — centered dialog over a dimmed overlay.
 */
export function Modal({
  open = true,
  title,
  children,
  footer,
  onClose,
  width = 480,
  style = {},
}) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        background: "rgba(4,4,4,0.46)",
      }}
    >
      <div
        role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto",
          background: "var(--color-background-surface-raised)",
          borderRadius: "var(--radius-lg-px)", boxShadow: "var(--elevation-overlay)",
          display: "flex", flexDirection: "column", ...style,
        }}
      >
        {(title || onClose) && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "16px", padding: "20px 24px 12px",
          }}>
            {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-h3-size)", fontWeight: "var(--weight-bold)", color: "var(--color-text-primary)" }}>{title}</span>}
            {onClose && (
              <button type="button" aria-label="Fermer" onClick={onClose} style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, border: "none", background: "transparent",
                color: "var(--color-icon-default)", cursor: "pointer", borderRadius: "var(--radius-pill-px)",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            )}
          </div>
        )}
        <div style={{ padding: "0 24px 20px", fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "12px 24px 20px" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
