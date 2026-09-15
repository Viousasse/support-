import React from "react";

export function EmptyState({title, description, icon, action, className = ""}) {
  return (
    <div className={["da-empty", className].filter(Boolean).join(" ")}>
      <div className="da-empty__icon">{icon}</div>
      {title ? <p className="da-empty__title">{title}</p> : null}
      {description ? <p className="da-empty__text">{description}</p> : null}
      {action ? <div className="da-empty__action">{action}</div> : null}
    </div>
  );
}
