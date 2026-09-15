import React from "react";

export function Tooltip({label, placement = "top", children, className = ""}) {
  const [open, setOpen] = React.useState(false);
  return (
    <span className={["da-tooltip", className].filter(Boolean).join(" ")} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open ? <span className={"da-tooltip__bubble da-tooltip__bubble--" + placement} role="tooltip">{label}</span> : null}
    </span>
  );
}
