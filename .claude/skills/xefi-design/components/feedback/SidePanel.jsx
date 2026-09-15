import React from "react";

export function SidePanel({open = true, title, children, footer, onClose, width = 420, className = ""}) {
  if (!open) return null;
  return (
    <aside className={["da-panel", className].filter(Boolean).join(" ")} style={{width}}>
      <header className="da-panel__header">
        <h2 className="da-panel__title">{title}</h2>
        <button className="da-alert__close" onClick={onClose} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </header>
      <div className="da-panel__body">{children}</div>
      {footer ? <footer className="da-panel__footer">{footer}</footer> : null}
    </aside>
  );
}
