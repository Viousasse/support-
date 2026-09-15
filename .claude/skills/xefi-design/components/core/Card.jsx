import React from "react";

export function Card({title, children, flat = false, className = "", ...rest}) {
  const cls = ["da-card", flat ? "da-card--flat" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {title ? <h3 className="da-card__title">{title}</h3> : null}
      {typeof children === "string" ? <p className="da-card__body">{children}</p> : children}
    </div>
  );
}
