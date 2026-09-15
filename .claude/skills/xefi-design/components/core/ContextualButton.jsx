import React from "react";
import { Icon } from "../brand/Icon.jsx";

// The DailyUp contextual row actions (Btn/check · close · history · note ·
// window-close): small toggle icon buttons with a tinted "active" state.
const KINDS = {
  check:        { icon: "Check",            tone: "success" },
  close:        { icon: "CloseStyleRound",  tone: "error" },
  history:      { icon: "History",          tone: "warning" },
  note:         { icon: "StickerTextOutline", tone: "neutral" },
  "window-close": { icon: "WindowClose",    tone: "neutral" },
};
const TONES = {
  success: { fg: "var(--color-feedback-success-text)", bg: "var(--color-feedback-success-surface)" },
  error:   { fg: "var(--color-feedback-error-text)",   bg: "var(--color-feedback-error-surface)" },
  warning: { fg: "var(--color-feedback-warning-text)", bg: "var(--color-feedback-warning-surface)" },
  neutral: { fg: "var(--color-text-primary)",          bg: "var(--color-background-surface-sunken)" },
};

/**
 * DailyUp ContextualButton — compact row action (validate / reject / history /
 * note / dismiss). Ghost by default; shows a tone-tinted fill when `active`
 * or hovered. Covers the Figma Btn/check · close · history · note · window-close set.
 */
export function ContextualButton({
  kind = "note",
  active = false,
  size = 36,
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const k = KINDS[kind] || KINDS.note;
  const t = TONES[k.tone];
  const on = active || hover;

  return (
    <button
      type="button"
      aria-label={ariaLabel || kind}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, flexShrink: 0, border: "none",
        borderRadius: "var(--radius-md-px)",
        background: disabled ? "transparent" : on ? t.bg : "transparent",
        color: disabled ? "var(--color-text-disabled)" : on ? t.fg : "var(--color-icon-default)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={k.icon} size={Math.round(size * 0.56)} />
    </button>
  );
}
