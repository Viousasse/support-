import React from "react";
import { Avatar } from "./Avatar.jsx";

/**
 * DailyUp AvatarInline — avatar paired with a name and optional secondary line,
 * laid out horizontally for use in rows, mentions and assignee fields.
 */
export function AvatarInline({
  name,
  secondary,
  src,
  initials,
  size = "sm",
  reverse = false,
  style = {},
  ...rest
}) {
  const nameFont = { xs: 12, sm: 14, md: 15, lg: 16, xl: 18 }[size] || 14;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexDirection: reverse ? "row-reverse" : "row", ...style }} {...rest}>
      <Avatar src={src} initials={initials} size={size} />
      <span style={{ display: "flex", flexDirection: "column", minWidth: 0, textAlign: reverse ? "right" : "left" }}>
        {name && <span style={{ fontFamily: "var(--font-sans)", fontSize: nameFont, fontWeight: 600, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>}
        {secondary && <span style={{ fontFamily: "var(--font-sans)", fontSize: nameFont - 2, color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{secondary}</span>}
      </span>
    </span>
  );
}
