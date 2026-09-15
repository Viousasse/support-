import React from "react";

const SIZES = {30: 30, 36: 36, 40: 40, 48: 48};

export function IconButton({icon, label, size = 36, variant = "default", disabled = false, onClick, className = "", ...rest}) {
  const px = SIZES[size] || 36;
  const cls = ["da-iconbtn", variant === "ghost" ? "da-iconbtn--ghost" : "", className].filter(Boolean).join(" ");
  return (
    <button type="button" aria-label={label} title={label} className={cls} disabled={disabled} onClick={onClick} style={{width: px, height: px}} {...rest}>
      {icon}
    </button>
  );
}
