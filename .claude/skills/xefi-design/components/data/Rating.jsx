import React from "react";

/**
 * DailyUp Rating — star rating, read-only or interactive. value 0–max.
 */
export function Rating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 22,
  style = {},
}) {
  const [hover, setHover] = React.useState(0);
  const shown = hover || value;

  return (
    <div style={{ display: "inline-flex", gap: 2, ...style }} onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        const filled = n <= shown;
        return (
          <button key={i} type="button" disabled={readOnly} aria-label={n + " étoiles"}
            onMouseEnter={() => !readOnly && setHover(n)}
            onClick={() => !readOnly && onChange && onChange(n)}
            style={{ display: "inline-flex", padding: 0, border: "none", background: "transparent", cursor: readOnly ? "default" : "pointer", color: filled ? "var(--dailyup-colors-amber-darken-1)" : "var(--color-border-default)", lineHeight: 0 }}>
            <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
              <path d="M12 2l2.95 6.18 6.8.78-5.02 4.62 1.36 6.7L12 17.77 5.91 21.06l1.36-6.7L2.25 9.74l6.8-.78L12 2Z" strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
