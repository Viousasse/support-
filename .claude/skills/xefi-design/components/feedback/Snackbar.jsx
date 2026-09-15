import React from "react";

/**
 * DailyUp Snackbar — a compact dark transient message (vs the white Toast).
 * Single line with optional action link and dismiss.
 */
export function Snackbar({ message, actionLabel, onAction, onClose, style = {} }) {
  return (
    <div role="status" style={{
      display: "inline-flex", alignItems: "center", gap: 16, maxWidth: 480,
      padding: "12px 12px 12px 18px", background: "var(--dailyup-colors-grey-darken-4)",
      color: "var(--dailyup-colors-white)", borderRadius: "var(--radius-md-px)",
      boxShadow: "var(--elevation-3)", ...style,
    }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", flex: 1 }}>{message}</span>
      {actionLabel && (
        <button type="button" onClick={onAction} style={{
          flexShrink: 0, border: "none", background: "transparent", color: "var(--dailyup-colors-red-lighten-2)",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: 700, cursor: "pointer", padding: 0,
        }}>{actionLabel}</button>
      )}
      {onClose && (
        <button type="button" aria-label="Fermer" onClick={onClose} style={{
          flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24,
          border: "none", background: "transparent", color: "var(--dailyup-colors-grey-lighten-1)", cursor: "pointer", borderRadius: "var(--radius-pill-px)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
}

/**
 * DailyUp SnackbarStack — fixed-position stack of snackbars. items:
 * [{ id, message, actionLabel?, onAction? }]. position picks a corner.
 */
export function SnackbarStack({ items = [], onClose, position = "bottom-left", style = {} }) {
  const [v, h] = position.split("-");
  const pos = {
    position: "fixed", zIndex: 200, display: "flex", flexDirection: "column", gap: 10,
    [v]: 24, [h]: 24, alignItems: h === "right" ? "flex-end" : "flex-start",
    ...style,
  };
  return (
    <div style={pos}>
      {items.map(it => (
        <Snackbar key={it.id} message={it.message} actionLabel={it.actionLabel} onAction={it.onAction}
          onClose={onClose ? () => onClose(it.id) : undefined} />
      ))}
    </div>
  );
}
