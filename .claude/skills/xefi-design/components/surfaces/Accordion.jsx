import React from "react";

/**
 * DailyUp Accordion — a single expandable section. Controlled via `open` or
 * self-managed with `defaultOpen`. Use several stacked for an accordion list.
 * Set `divider={false}` on the last of a stack so no rule dangles below it.
 */
export function Accordion({
  title,
  children,
  open,
  defaultOpen = false,
  onToggle,
  leading = null,
  divider = true,
  style = {},
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open != null ? open : internal;
  const toggle = () => { if (open == null) setInternal(o => !o); if (onToggle) onToggle(!isOpen); };

  return (
    <div style={{ borderBottom: divider ? "1px solid var(--color-border-subtle)" : "none", ...style }}>
      <button type="button" onClick={toggle} aria-expanded={isOpen} style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "16px 4px",
        border: "none", background: "transparent", cursor: "pointer", textAlign: "left",
      }}>
        {leading && <span style={{ display: "inline-flex", color: "var(--color-icon-default)", flexShrink: 0 }}>{leading}</span>}
        <span style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "var(--text-label-lg-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{title}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-icon-default)", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform var(--motion-normal) var(--ease-standard)" }}>
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-normal) var(--ease-standard)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 4px 16px", fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
