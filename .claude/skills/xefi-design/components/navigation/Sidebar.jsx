import React from "react";

export function Sidebar({items = [], active, onNavigate, ctaLabel = "Créer une note", ctaIcon = null, onCta, basePath = "assets", className = ""}) {
  return (
    <aside className={["da-sidebar", className].filter(Boolean).join(" ")}>
      <button className="da-sidebar__cta" onClick={onCta}>
        <span className="da-sidebar__cta-glyph">{ctaIcon}</span>
        <span>{ctaLabel}</span>
      </button>
      <div className="da-sidebar__rule" />
      <nav className="da-sidebar__nav">
        {items.map((it) => (
          <button key={it.id} className={"da-navitem" + (it.id === active ? " da-navitem--active" : "")}
            onClick={() => onNavigate && onNavigate(it.id)}>
            {it.icon}<span>{it.label}</span>
          </button>
        ))}
      </nav>
      <span className="da-sidebar__motif"><img src={basePath + "/sidebar-motif.svg"} alt="" /></span>
    </aside>
  );
}
