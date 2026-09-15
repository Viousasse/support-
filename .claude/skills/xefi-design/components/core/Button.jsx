import React from "react";

export function Button({children, variant = "primary", size = 40, icon = null, iconPosition = "right", block = false, disabled = false, state = "default", type = "button", onClick, className = "", ...rest}) {
  const cls = ["da-btn", "da-btn--" + size, "da-btn--" + variant, block ? "da-btn--block" : "", state === "hover" ? "is-hover" : "", className].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} {...rest}>
      {icon && iconPosition === "left" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? icon : null}
    </button>
  );
}
