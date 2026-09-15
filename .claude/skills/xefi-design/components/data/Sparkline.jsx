import React from "react";

/**
 * DailyUp Sparkline — a tiny inline trend chart (SVG polyline + optional area
 * fill and end dot). data: array of numbers. Pairs with StatCard.
 */
export function Sparkline({
  data = [],
  width = 96,
  height = 28,
  stroke = "var(--color-action-primary-default)",
  fill = true,
  dot = true,
  strokeWidth = 1.5,
  style = {},
}) {
  if (!data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pad = strokeWidth + (dot ? 2 : 0);
  const X = (i) => (i / (data.length - 1 || 1)) * (width - pad * 2) + pad;
  const Y = (v) => height - pad - ((v - min) / span) * (height - pad * 2);
  const pts = data.map((v, i) => `${X(i)},${Y(v)}`).join(" ");
  const area = `${X(0)},${height} ${pts} ${X(data.length - 1)},${height}`;
  const gid = React.useId().replace(/:/g, "");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible", ...style }}>
      {fill && (
        <>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={area} fill={`url(#${gid})`} />
        </>
      )}
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {dot && <circle cx={X(data.length - 1)} cy={Y(data[data.length - 1])} r={strokeWidth + 1.2} fill={stroke} />}
    </svg>
  );
}
