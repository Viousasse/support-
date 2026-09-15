import React from "react";

/**
 * DailyUp Banner — inline contextual alert (a persistent, full-width message
 * bar). Tone-tinted surface + border, optional icon, action and dismiss.
 */
export function Banner({
  title,
  children,
  tone = "info",
  icon,
  actionLabel,
  onAction,
  onClose,
  style = {},
}) {
  const tones = {
    info:    { text: "var(--color-feedback-info-text)", surface: "var(--color-feedback-info-surface)", border: "var(--color-feedback-info-border)" },
    success: { text: "var(--color-feedback-success-text)", surface: "var(--color-feedback-success-surface)", border: "var(--color-feedback-success-border)" },
    warning: { text: "var(--color-feedback-warning-text)", surface: "var(--color-feedback-warning-surface)", border: "var(--color-feedback-warning-border)" },
    error:   { text: "var(--color-feedback-error-text)", surface: "var(--color-feedback-error-surface)", border: "var(--color-feedback-error-border)" },
    brand:   { text: "var(--color-brand-default)", surface: "var(--dailyup-colors-red-lighten-5)", border: "var(--dailyup-colors-red-lighten-4)" },
  };
  const t = tones[tone] || tones.info;
  const defaultIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" /></svg>;

  return (
    <div role="alert" style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px",
      background: `color-mix(in srgb, ${t.surface} 50%, transparent)`, border: `1px solid ${t.border}`, borderRadius: "var(--radius-md-px)",
      boxSizing: "border-box", ...style,
    }}>
      <span style={{ display: "inline-flex", color: t.text, flexShrink: 0 }}>{icon || defaultIcon}</span>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</span>}
        {children && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{children}</span>}
      </div>
      {actionLabel && (
        <button type="button" onClick={onAction} style={{
          flexShrink: 0, height: 30, padding: "0 14px", border: `1px solid ${t.border}`, background: "transparent",
          color: t.text, fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: 600,
          borderRadius: "var(--radius-pill-px)", cursor: "pointer",
        }}>{actionLabel}</button>
      )}
      {onClose && (
        <button type="button" aria-label="Fermer" onClick={onClose} style={{
          flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26,
          border: "none", background: "transparent", color: t.text, cursor: "pointer", borderRadius: "var(--radius-pill-px)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
}
