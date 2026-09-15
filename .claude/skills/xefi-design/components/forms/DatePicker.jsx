import React from "react";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const DAYS = ["L", "M", "M", "J", "V", "S", "D"]; // Monday-first

/**
 * DailyUp DatePicker — month/year calendar. Selected day is XEFI red;
 * Monday-first French grid. The month and year pills are dropdowns: click
 * either to open a picker grid and jump to that month/year.
 */
export function DatePicker({
  value,
  onChange,
  style = {},
}) {
  const today = new Date();
  const init = value instanceof Date ? value : today;
  const [view, setView] = React.useState({ month: init.getMonth(), year: init.getFullYear() });
  const [selected, setSelected] = React.useState(value instanceof Date ? value : null);
  const [picker, setPicker] = React.useState(null); // null | "month" | "year"

  const firstDay = new Date(view.year, view.month, 1);
  const lead = (firstDay.getDay() + 6) % 7; // Monday-first offset
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSel = (d) => selected && selected.getDate() === d && selected.getMonth() === view.month && selected.getFullYear() === view.year;
  const isToday = (d) => today.getDate() === d && today.getMonth() === view.month && today.getFullYear() === view.year;

  // dropdown pill: neutral field control — border, dark text, chevron flips when open
  const Pill = ({ label, kind }) => {
    const open = picker === kind;
    return (
      <button type="button" onClick={() => setPicker(open ? null : kind)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flex: 1,
        height: 36, padding: "0 12px", cursor: "pointer",
        border: "1px solid " + (open ? "var(--color-border-strong)" : "var(--color-border-default)"),
        background: open ? "var(--color-background-surface-sunken)" : "var(--color-background-surface)",
        color: "var(--color-text-primary)", borderRadius: "var(--radius-field)",
        fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
        transition: "background var(--motion-fast) var(--ease-standard), border-color var(--motion-fast) var(--ease-standard)",
      }}>
        <span>{label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-icon-default)", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--motion-fast) var(--ease-standard)" }}>
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  };

  // a selectable option inside a picker grid
  const Option = ({ active, onClick, children }) => (
    <button type="button" onClick={onClick} style={{
      height: 40, border: "none", borderRadius: "var(--radius-field)", cursor: "pointer",
      background: active ? "var(--red-50)" : "transparent",
      color: active ? "var(--red-700)" : "var(--color-text-primary)",
      fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: active ? 700 : 500,
      transition: "background var(--motion-fast) var(--ease-standard)",
    }}
    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--color-action-secondary-hover)"; }}
    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
      {children}
    </button>
  );

  const years = [];
  for (let y = view.year - 7; y <= view.year + 8; y++) years.push(y);

  return (
    <div style={{
      display: "inline-flex", flexDirection: "column", gap: 14, width: 300, padding: 16,
      background: "var(--color-background-surface-raised)", border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-lg-px)", boxShadow: "var(--elevation-3)", ...style,
    }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Pill label={MONTHS[view.month]} kind="month" />
        <Pill label={view.year} kind="year" />
      </div>

      {picker === "month" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {MONTHS.map((m, i) => (
            <Option key={m} active={i === view.month} onClick={() => { setView(v => ({ ...v, month: i })); setPicker(null); }}>{m}</Option>
          ))}
        </div>
      )}

      {picker === "year" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, maxHeight: 232, overflowY: "auto" }}>
          {years.map((y) => (
            <Option key={y} active={y === view.year} onClick={() => { setView(v => ({ ...v, year: y })); setPicker(null); }}>{y}</Option>
          ))}
        </div>
      )}

      {picker === null && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {DAYS.map((d, i) => (
            <span key={i} style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", padding: "4px 0" }}>{d}</span>
          ))}
          {cells.map((d, i) => (
            <div key={i} style={{ aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {d && (
                <button type="button" onClick={() => { const nd = new Date(view.year, view.month, d); setSelected(nd); onChange && onChange(nd); }}
                  style={{
                    width: 32, height: 32, border: isToday(d) && !isSel(d) ? "1px solid var(--color-border-strong)" : "none",
                    borderRadius: "var(--radius-md-px)", cursor: "pointer",
                    background: isSel(d) ? "var(--dailyup-colors-red-xefi)" : "transparent",
                    color: isSel(d) ? "var(--color-text-on-action)" : "var(--color-text-primary)",
                    fontFamily: "var(--font-data)", fontSize: 14, fontWeight: isSel(d) ? 700 : 400,
                    transition: "background var(--motion-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => { if (!isSel(d)) e.currentTarget.style.background = "var(--color-action-secondary-hover)"; }}
                  onMouseLeave={(e) => { if (!isSel(d)) e.currentTarget.style.background = "transparent"; }}>
                  {d}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
