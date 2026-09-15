import React from "react";

/**
 * DailyUp Placeholder — a layout slot or loading skeleton.
 * variant "slot": dashed empty box with a centered label (the Figma
 * "placeholder/content"). variant "skeleton": shimmering grey block(s)
 * for loading states. `lines` renders stacked skeleton bars.
 */
export function Placeholder({
  variant = "slot",
  label = "Placeholder",
  width = "100%",
  height = 96,
  lines = 0,
  radius = "var(--radius-md-px)",
  style = {},
}) {
  if (lines > 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width, ...style }}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBar key={i} height={14} radius="var(--radius-sm-px)" width={i === lines - 1 ? "60%" : "100%"} />
        ))}
      </div>
    );
  }

  if (variant === "skeleton") {
    return <SkeletonBar width={width} height={height} radius={radius} style={style} />;
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width, height, boxSizing: "border-box",
      border: "1.5px dashed var(--color-border-default)", borderRadius: "var(--radius-lg-px)",
      background: "var(--color-background-surface)", ...style,
    }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-secondary)" }}>{label}</span>
    </div>
  );
}

function SkeletonBar({ width, height, radius, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius: radius, flexShrink: 0,
      background: "linear-gradient(90deg, var(--color-background-surface-sunken) 25%, var(--dailyup-colors-grey-lighten-3) 37%, var(--color-background-surface-sunken) 63%)",
      backgroundSize: "400% 100%", animation: "du-shimmer 1.4s ease infinite",
      ...style,
    }}>
      <style>{`@keyframes du-shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }`}</style>
    </div>
  );
}
