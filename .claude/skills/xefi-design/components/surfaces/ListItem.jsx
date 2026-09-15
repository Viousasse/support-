import React from "react";

/**
 * DailyUp ListItem — a single row: optional leading visual, title + subtitle,
 * optional trailing content. Used in lists, menus, popovers.
 */
export function ListItem({
  leading,
  title,
  subtitle,
  trailing,
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "10px 12px", borderRadius: "var(--radius-md-px)",
        background: selected ? "var(--color-action-secondary-active)" : hover && onClick ? "var(--color-action-secondary-hover)" : "transparent",
        cursor: onClick ? "pointer" : "default",
        transition: "background var(--motion-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {leading && <span style={{ display: "inline-flex", flexShrink: 0, color: "var(--color-icon-default)" }}>{leading}</span>}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1px" }}>
        {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: "var(--weight-medium)", color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>}
        {subtitle && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</span>}
      </div>
      {trailing && <span style={{ display: "inline-flex", flexShrink: 0, color: "var(--color-icon-muted)" }}>{trailing}</span>}
    </div>
  );
}
