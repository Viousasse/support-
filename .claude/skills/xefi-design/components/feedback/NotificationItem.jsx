import React from "react";

/**
 * DailyUp StatusDot — small colored presence/status indicator. Optional ring
 * (for overlaying on avatars) and pulse animation for "live".
 */
export function StatusDot({ status = "online", size = 10, ring = false, pulse = false, style = {} }) {
  const colors = {
    online: "var(--color-feedback-success-text)",
    busy: "var(--color-brand-default)",
    away: "var(--color-feedback-warning-text)",
    offline: "var(--color-icon-muted)",
  };
  const c = colors[status] || colors.offline;
  return (
    <span style={{ position: "relative", display: "inline-flex", width: size, height: size, ...style }}>
      {pulse && status === "online" && (
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: c, opacity: 0.5, animation: "du-pulse 1.6s ease-out infinite" }} />
      )}
      <span style={{ width: size, height: size, borderRadius: "50%", background: c, boxShadow: ring ? "0 0 0 2px var(--color-background-surface)" : "none" }} />
      <style>{`@keyframes du-pulse { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(2.4); opacity: 0; } }`}</style>
    </span>
  );
}

/**
 * NotificationItem — a single notification row: icon chip, title + body, time,
 * and an unread dot. Use inside a Popover/Menu or a notifications panel.
 */
export function NotificationItem({ icon, title, body, time, unread = false, tone = "neutral", onClick, style = {} }) {
  const [hover, setHover] = React.useState(false);
  const chip = {
    neutral: { fg: "var(--color-icon-default)", bg: "var(--color-background-surface-sunken)" },
    brand: { fg: "var(--color-brand-default)", bg: "var(--dailyup-colors-red-lighten-5)" },
    info: { fg: "var(--dailyup-colors-blue-darken-1)", bg: "var(--dailyup-colors-blue-lighten-5)" },
    success: { fg: "var(--color-feedback-success-text)", bg: "var(--color-feedback-success-surface)" },
    warning: { fg: "var(--color-feedback-warning-text)", bg: "var(--color-feedback-warning-surface)" },
  }[tone] || { fg: "var(--color-icon-default)", bg: "var(--color-background-surface-sunken)" };

  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", cursor: onClick ? "pointer" : "default",
      background: hover && onClick ? "var(--color-background-surface-sunken)" : unread ? "var(--dailyup-colors-red-lighten-5)" : "transparent",
      borderRadius: "var(--radius-md-px)", transition: "background var(--motion-fast) var(--ease-standard)", ...style,
    }}>
      {icon && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, flexShrink: 0, borderRadius: "var(--radius-pill-px)", background: chip.bg, color: chip.fg }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{title}</span>
        {body && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{body}</span>}
        {time && <span style={{ fontFamily: "var(--font-data)", fontSize: 11, color: "var(--color-text-secondary)" }}>{time}</span>}
      </div>
      {unread && <span style={{ width: 8, height: 8, flexShrink: 0, marginTop: 6, borderRadius: "50%", background: "var(--color-brand-default)" }} />}
    </div>
  );
}
