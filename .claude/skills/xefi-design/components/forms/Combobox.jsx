import React from "react";

/**
 * DailyUp Combobox — searchable multi-select that renders chosen values as
 * removable chips. options: [{ value, label }]. Controlled via `value`
 * (array of selected values) and `onChange`.
 */
export function Combobox({
  options = [],
  value = [],
  onChange,
  placeholder = "Rechercher…",
  label,
  style = {},
}) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const reactId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selected = options.filter(o => value.includes(o.value));
  const matches = options.filter(o => !value.includes(o.value) && o.label.toLowerCase().includes(query.toLowerCase()));
  const add = (v) => { onChange && onChange([...value, v]); setQuery(""); };
  const remove = (v) => onChange && onChange(value.filter(x => x !== v));

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", position: "relative", ...style }}>
      {label && <label htmlFor={reactId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{label}</label>}
      <div onClick={() => setOpen(true)} style={{
        display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, minHeight: 48, padding: "6px 10px",
        background: "var(--color-background-surface)", border: `1px solid ${open ? "var(--color-border-focus)" : "var(--color-border-default)"}`,
        boxShadow: open ? "var(--focus-ring)" : "none", borderRadius: "var(--radius-md-px)", cursor: "text",
        transition: "border-color var(--motion-fast) var(--ease-standard), box-shadow var(--motion-fast) var(--ease-standard)",
      }}>
        {selected.map(o => (
          <span key={o.value} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 28, padding: "0 5px 0 10px", background: "var(--surface-card)", color: "var(--text-body)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill-px)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500 }}>
            {o.label}
            <button type="button" aria-label={"Retirer " + o.label} onClick={(e) => { e.stopPropagation(); remove(o.value); }} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, border: "none", borderRadius: "var(--radius-pill-px)", background: "transparent", color: "var(--text-muted)", cursor: "pointer", flex: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-subtle)"; e.currentTarget.style.color = "var(--text-title)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{flex:"none"}}><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </span>
        ))}
        <input id={reactId} value={query} placeholder={selected.length ? "" : placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
          style={{ flex: 1, minWidth: 80, border: "none", outline: "none", background: "transparent", height: 28, fontFamily: "var(--font-sans)", fontSize: "var(--body-size)", color: "var(--color-text-primary)" }} />
      </div>
      {open && matches.length > 0 && (
        <div role="listbox" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 60, maxHeight: 220, overflowY: "auto", background: "var(--color-background-surface-raised)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-md-px)", boxShadow: "var(--elevation-overlay)", padding: 6 }}>
          {matches.map(o => (
            <button key={o.value} type="button" onClick={() => add(o.value)} style={{ display: "block", width: "100%", padding: "9px 12px", border: "none", borderRadius: "var(--radius-sm-px)", cursor: "pointer", textAlign: "left", background: "transparent", fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-action-secondary-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>{o.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
