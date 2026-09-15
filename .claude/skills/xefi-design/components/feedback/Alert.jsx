import React from "react";

const TONES = {
  success: "var(--feedback-success)",
  error: "var(--feedback-error)",
  warning: "var(--feedback-warning)",
  info: "var(--feedback-info)"
};

export function Alert({tone = "info", title, children, onClose, className = ""}) {
  return (
    <div className={["da-alert", "da-alert--" + tone, className].filter(Boolean).join(" ")} role="status">
      <span className="da-alert__dot" style={{color: TONES[tone], background: "transparent"}} />
      <div>
        {title ? <p className="da-alert__title">{title}</p> : null}
        {children ? <p className="da-alert__text">{children}</p> : null}
      </div>
      {onClose ? (
        <button className="da-alert__close" onClick={onClose} aria-label="Fermer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      ) : null}
    </div>
  );
}
