import React from "react";

/**
 * DailyUp Menu — a dropdown action menu opened from a trigger. items:
 * [{ label, icon?, onClick?, tone?, divider?, disabled? }]. tone "danger"
 * renders the item in brand red. defaultOpen mounts the panel already open —
 * for specimens and thumbnails, where no click ever happens.
 */
export function Menu({
  trigger,
  items = [],
  align = "left",
  defaultOpen = false,
  style = {},
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <span onClick={() => setOpen(o => !o)} style={{ display: "inline-flex" }}>{trigger}</span>
      {open && (
        <div role="menu" style={{
          position: "absolute", top: "calc(100% + 6px)", [align]: 0, zIndex: 60, minWidth: 200,
          background: "var(--color-background-surface-raised)", border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-md-px)", boxShadow: "var(--elevation-overlay)", padding: 6, ...style,
        }}>
          {items.map((it, i) => it.divider ? (
            <div key={i} style={{ height: 1, background: "var(--color-border-subtle)", margin: "6px 4px" }} />
          ) : (
            <button key={i} type="button" role="menuitem" disabled={it.disabled}
              onClick={() => { setOpen(false); it.onClick && it.onClick(); }} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px",
              border: "none", borderRadius: "var(--radius-sm-px)", cursor: it.disabled ? "not-allowed" : "pointer", textAlign: "left",
              background: "transparent",
              color: it.disabled ? "var(--color-text-disabled)" : it.tone === "danger" ? "var(--color-brand-default)" : "var(--color-text-primary)",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: 500,
            }}
            onMouseEnter={(e) => { if (!it.disabled) e.currentTarget.style.background = "var(--color-action-secondary-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              {it.icon && <span style={{ display: "inline-flex", flexShrink: 0, color: "inherit" }}>{it.icon}</span>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
