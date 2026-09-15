import React from "react";

export function Chip({children, selected = false, onClick, className = "", ...rest}) {
  const cls = ["da-chip", selected ? "da-chip--selected" : "", className].filter(Boolean).join(" ");
  return <button type="button" className={cls} aria-pressed={selected} onClick={onClick} {...rest}>{children}</button>;
}
