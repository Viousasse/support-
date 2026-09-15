import React from "react";
import { Avatar } from "./Avatar.jsx";

/**
 * DailyUp AvatarGroup — overlapping stack of avatars with an overflow count.
 */
export function AvatarGroup({
  people = [],
  max = 4,
  size = "sm",
  style = {},
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const overlap = { xs: -6, sm: -8, md: -10, lg: -14, xl: -20 }[size] || -8;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", ...style }}>
      {shown.map((p, i) => (
        <span key={i} style={{ marginLeft: i ? overlap : 0, borderRadius: "var(--radius-pill-px)", boxShadow: "0 0 0 2px var(--color-background-surface)" }}>
          {typeof p === "string" ? <Avatar initials={p} size={size} /> : <Avatar {...p} size={size} />}
        </span>
      ))}
      {extra > 0 && (
        <span style={{ marginLeft: overlap, borderRadius: "var(--radius-pill-px)", boxShadow: "0 0 0 2px var(--color-background-surface)" }}>
          <Avatar number={"+" + extra} size={size} />
        </span>
      )}
    </div>
  );
}
