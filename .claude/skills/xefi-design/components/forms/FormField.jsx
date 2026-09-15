import React from "react";

/**
 * DailyUp FormField — a labeled field row: title (+ required *), a bordered
 * control with optional leading icon, an inline action button and a dropdown
 * affordance, plus helper/subtitle text. States: default, focus, error,
 * disabled. Set `multiline` for an expanded textarea-style field.
 */
export function FormField({
  label,
  required = false,
  leadingIcon = null,
  placeholder = "Text",
  value,
  defaultValue,
  onChange,
  actionLabel,
  onAction,
  dropdown = false,
  onDropdown,
  helperText,
  error = false,
  disabled = false,
  multiline = false,
  id,
  style = {},
}) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const fieldId = id || reactId;

  const borderColor = error
    ? "var(--color-feedback-error-border)"
    : focus ? "var(--color-border-focus)" : "var(--color-border-default)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: "var(--weight-bold)",
          color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        }}>
          {label}{required && <span style={{ color: "var(--color-brand-default)", marginLeft: 3 }}>*</span>}
        </label>
      )}

      <div style={{
        display: "flex", alignItems: multiline ? "flex-start" : "center", gap: 10,
        minHeight: 48, padding: multiline ? "12px 8px 12px 14px" : "4px 4px 4px 14px",
        background: disabled ? "var(--color-background-surface-sunken)" : "var(--color-background-surface-sunken)",
        border: `1px solid ${borderColor}`,
        boxShadow: focus && !error ? "var(--focus-ring)" : "none",
        borderRadius: "var(--radius-md-px)",
        transition: "border-color var(--motion-fast) var(--ease-standard), box-shadow var(--motion-fast) var(--ease-standard)",
      }}>
        {leadingIcon && <span style={{ display: "inline-flex", color: "var(--color-icon-default)", flexShrink: 0, paddingTop: multiline ? 2 : 0 }}>{leadingIcon}</span>}
        {multiline ? (
          <textarea id={fieldId} defaultValue={defaultValue} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} rows={3}
            style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", resize: "none",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)", lineHeight: 1.5 }} />
        ) : (
          <input id={fieldId} defaultValue={defaultValue} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)" }} />
        )}
        {actionLabel && (
          <button type="button" onClick={onAction} disabled={disabled} style={{
            flexShrink: 0, height: 40, padding: "0 16px", border: "none",
            background: disabled ? "var(--grey-100)" : "var(--color-action-primary-default)",
            color: disabled ? "var(--grey-600)" : "var(--color-text-on-action)",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)",
            fontWeight: "var(--weight-semibold)", borderRadius: "var(--radius-field)", cursor: disabled ? "not-allowed" : "pointer",
          }}>{actionLabel}</button>
        )}
        {dropdown && (
          <button type="button" aria-label="Ouvrir" onClick={onDropdown} disabled={disabled} style={{
            flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 40, border: "none", background: "transparent",
            color: disabled ? "var(--color-icon-muted)" : "var(--color-icon-default)", cursor: disabled ? "not-allowed" : "pointer",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>

      {helperText && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)",
          color: error ? "var(--color-feedback-error-text)" : disabled ? "var(--color-text-disabled)" : "var(--color-text-secondary)" }}>{helperText}</span>
      )}
    </div>
  );
}
