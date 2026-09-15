import React from "react";

const DOW = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

/**
 * DailyUp Calendar — month grid that plots events on days. events: [{ date:Date,
 * tone? }]. Days with events show tone-colored dots; selectable days.
 */
export function Calendar({
  month,
  year,
  events = [],
  selected,
  onSelectDay,
  onChangeMonth,
  style = {},
}) {
  const today = new Date();
  const [view, setView] = React.useState({
    month: month != null ? month : today.getMonth(),
    year: year != null ? year : today.getFullYear(),
  });

  const lead = (new Date(view.year, view.month, 1).getDay() + 6) % 7;
  const days = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const shift = (delta) => {
    let m = view.month + delta, y = view.year;
    if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
    const next = { month: m, year: y };
    setView(next); onChangeMonth && onChangeMonth(next);
  };

  const toneColor = (tone) => ({
    brand: "var(--color-brand-default)", info: "var(--dailyup-colors-blue-darken-1)",
    success: "var(--color-feedback-success-text)", warning: "var(--color-feedback-warning-text)",
  }[tone] || "var(--color-icon-default)");

  const dayEvents = (d) => events.filter(e => e.date && e.date.getDate() === d && e.date.getMonth() === view.month && e.date.getFullYear() === view.year);
  const isSel = (d) => selected && selected.getDate() === d && selected.getMonth() === view.month && selected.getFullYear() === view.year;
  const isToday = (d) => today.getDate() === d && today.getMonth() === view.month && today.getFullYear() === view.year;

  const nav = (label, fn) => (
    <button type="button" aria-label={label} onClick={fn} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, border: "none", background: "transparent", color: "var(--color-icon-default)", cursor: "pointer", borderRadius: "var(--radius-pill-px)" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-action-secondary-hover)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      {label === "Précédent"
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </button>
  );

  return (
    <div style={{ width: 320, padding: 16, background: "var(--color-background-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-lg-px)", boxShadow: "var(--elevation-card)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        {nav("Précédent", () => shift(-1))}
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-label-lg-size)", fontWeight: 700, color: "var(--color-text-primary)" }}>{MONTHS[view.month]} {view.year}</span>
        {nav("Suivant", () => shift(1))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {DOW.map((d, i) => <span key={i} style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)", padding: "4px 0" }}>{d}</span>)}
        {cells.map((d, i) => (
          <div key={i} style={{ aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {d && (
              <button type="button" onClick={() => onSelectDay && onSelectDay(new Date(view.year, view.month, d))} style={{
                position: "relative", width: 36, height: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                border: isToday(d) && !isSel(d) ? "1px solid var(--color-border-strong)" : "none", borderRadius: "var(--radius-md-px)", cursor: "pointer",
                background: isSel(d) ? "var(--color-action-primary-default)" : "transparent",
                color: isSel(d) ? "var(--color-text-on-action)" : "var(--color-text-primary)",
                fontFamily: "var(--font-data)", fontSize: 14, fontWeight: isSel(d) ? 700 : 400,
              }}
              onMouseEnter={(e) => { if (!isSel(d)) e.currentTarget.style.background = "var(--color-action-secondary-hover)"; }}
              onMouseLeave={(e) => { if (!isSel(d)) e.currentTarget.style.background = "transparent"; }}>
                {d}
                <span style={{ display: "flex", gap: 2, height: 4 }}>
                  {dayEvents(d).slice(0, 3).map((e, j) => <span key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: isSel(d) ? "var(--color-text-on-action)" : toneColor(e.tone) }} />)}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
