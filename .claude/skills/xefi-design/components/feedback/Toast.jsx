import React from "react";

/**
 * DailyUp Toast — transient notification. White surface, tone-tinted icon
 * chip and border, optional action button and dismiss.
 */
export function Toast({
  title,
  description,
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

  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" /></svg>
  );

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "16px",
      width: "100%", maxWidth: 560, padding: "16px",
      background: "var(--color-background-surface-raised)",
      border: `1px solid ${t.border}`, borderRadius: "var(--radius-lg-px)",
      boxShadow: "var(--elevation-3)", ...style,
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, flexShrink: 0, borderRadius: "var(--radius-md-px)",
        background: t.surface, color: t.text,
      }}>{icon || defaultIcon}</span>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
        {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-label-lg-size)", fontWeight: "var(--weight-bold)", color: "var(--color-text-primary)" }}>{title}</span>}
        {description && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{description}</span>}
      </div>

      {actionLabel && (
        <button type="button" onClick={onAction} style={{
          flexShrink: 0, height: 32, padding: "0 16px", border: "none",
          background: "var(--color-action-primary-default)", color: "var(--color-text-on-action)",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: "var(--weight-semibold)",
          borderRadius: "var(--radius-pill-px)", cursor: "pointer",
        }}>{actionLabel}</button>
      )}
      {onClose && (
        <button type="button" aria-label="Fermer" onClick={onClose} style={{
          flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, border: "none", background: "transparent",
          color: "var(--color-icon-default)", cursor: "pointer", borderRadius: "var(--radius-pill-px)",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
}
