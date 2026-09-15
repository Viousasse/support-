import React from "react";

/**
 * DailyUp Popover — click-triggered floating panel with an optional arrow.
 * Wraps a trigger; toggles a surface positioned relative to it.
 */
export function Popover({
  trigger,
  children,
  placement = "bottom",
  arrow = true,
  style = {},
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const pos = {
    bottom: { top: "calc(100% + 10px)", left: 0 },
    top:    { bottom: "calc(100% + 10px)", left: 0 },
    right:  { left: "calc(100% + 10px)", top: 0 },
    left:   { right: "calc(100% + 10px)", top: 0 },
  };
  const arrowStyle = {
    bottom: { top: -5, left: 18, borderWidth: "0 5px 5px 5px", borderColor: "transparent transparent var(--color-background-surface-raised) transparent" },
    top:    { bottom: -5, left: 18, borderWidth: "5px 5px 0 5px", borderColor: "var(--color-background-surface-raised) transparent transparent transparent" },
    right:  { left: -5, top: 18, borderWidth: "5px 5px 5px 0", borderColor: "transparent var(--color-background-surface-raised) transparent transparent" },
    left:   { right: -5, top: 18, borderWidth: "5px 0 5px 5px", borderColor: "transparent transparent transparent var(--color-background-surface-raised)" },
  };

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <span onClick={() => setOpen(o => !o)} style={{ display: "inline-flex" }}>{trigger}</span>
      {open && (
        <div role="dialog" style={{
          position: "absolute", zIndex: 60, ...pos[placement], minWidth: 200,
          background: "var(--color-background-surface-raised)",
          border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-md-px)",
          boxShadow: "var(--elevation-overlay)", padding: 6, ...style,
        }}>
          {arrow && <span style={{ position: "absolute", width: 0, height: 0, borderStyle: "solid", filter: "drop-shadow(0 -1px 0 var(--color-border-subtle))", ...arrowStyle[placement] }} />}
          {children}
        </div>
      )}
    </span>
  );
}
