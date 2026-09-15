import React from "react";

/**
 * DailyUp Breadcrumbs — path navigation. items: [{ label, href?, onClick? }].
 * The last item is the current page (non-interactive).
 */
export function Breadcrumbs({ items = [], style = {} }) {
  return (
    <nav aria-label="Fil d'Ariane" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last ? (
              <span aria-current="page" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{it.label}</span>
            ) : (
              <a href={it.href || "#"} onClick={it.onClick} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)", textDecoration: "none", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}>{it.label}</a>
            )}
            {!last && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-icon-muted)", flexShrink: 0 }}>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
