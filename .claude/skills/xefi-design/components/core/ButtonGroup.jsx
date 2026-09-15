import React from "react";

/**
 * ButtonGroup — contrôle segmenté à choix unique. Conteneur bordé, segment actif en
 * aplat rouge détaché, segments inactifs en texte gris sur fond transparent.
 * items: [{ id, label, icon? }]. Piloté par `value` / `onChange`.
 */
export function ButtonGroup({
  items = [],
  value,
  onChange,
  size = "md",
  style = {},
}) {
  const heights = { s: 30, md: 36, l: 40 };
  const h = heights[size] || heights.md;
  const pad = { s: "0 12px", md: "0 16px", l: "0 20px" }[size] || "0 16px";
  const font = { s: 13, md: 14, l: 14 }[size] || 14;
  const active = value ?? (items[0] && items[0].id);

  return (
    <div role="group" style={{
      display: "inline-flex", alignItems: "center", gap: 4, padding: 4,
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: 12, ...style,
    }}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button key={it.id} type="button" onClick={() => onChange && onChange(it.id)} aria-pressed={on} style={{
            display: "inline-flex", alignItems: "center", gap: 8, height: h, padding: pad,
            border: "none", cursor: "pointer", borderRadius: 9,
            background: on ? "var(--action-primary-bg)" : "transparent",
            color: on ? "var(--action-primary-text)" : "var(--text-muted)",
            fontFamily: "var(--font-core)", fontSize: font, fontWeight: on ? 700 : 500, whiteSpace: "nowrap",
            transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
          }}
          onMouseEnter={(e) => { if (!on) { e.currentTarget.style.background = "var(--surface-subtle)"; e.currentTarget.style.color = "var(--text-body)"; } }}
          onMouseLeave={(e) => { if (!on) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; } }}>
            {it.icon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{it.icon}</span>}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
