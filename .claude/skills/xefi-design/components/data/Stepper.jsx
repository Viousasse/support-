import React from "react";

/**
 * Stepper — frise d'avancement. Seul composant de frise du système : il couvre
 * l'avancement d'un objet dans un flux métier (pipeline DailyUp : Création →
 * Validation → Production → Facturation) ET la progression d'un formulaire
 * multi-écrans, qui faisait auparavant l'objet d'un composant `Steps` distinct.
 *
 * Deux façons de décrire l'état, au choix :
 *  - par étape — chaque entrée porte son `status` "done" | "current" | "pending" ;
 *  - par index — `current` désigne l'étape active, les précédentes sont faites.
 * `onStepClick` rend cliquables les étapes déjà franchies.
 */
export function Stepper({
  steps = [],
  current,
  onStepClick,
  orientation = "horizontal",
  style = {},
}) {
  const items = steps.map((s, i) => {
    const o = typeof s === "object" ? { ...s } : { label: s };
    if (current != null && !o.status) o.status = i < current ? "done" : i === current ? "current" : "pending";
    o.status = o.status || "pending";
    o.meta = o.meta || o.sub;
    o._i = i;
    return o;
  });
  const clickable = (i) => onStepClick && current != null && i <= current;
  const skin = (status) => {
    if (status === "done") return { fg: "var(--color-feedback-success-text)", bg: "var(--color-feedback-success-surface)", line: "var(--color-feedback-success-border)" };
    if (status === "current") return { fg: "var(--dailyup-colors-blue-darken-1)", bg: "var(--dailyup-colors-blue-lighten-5)", line: "var(--color-border-default)" };
    return { fg: "var(--color-icon-muted)", bg: "var(--color-background-surface-sunken)", line: "var(--color-border-default)" };
  };

  const dot = (s) => {
    const k = skin(s.status);
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, flexShrink: 0, borderRadius: "var(--radius-pill-px)",
        background: k.bg, color: k.fg,
        border: s.status === "current" ? "2px solid var(--dailyup-colors-blue-darken-1)" : "none",
      }}>
        {s.status === "done"
          ? <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          : (s.icon || <span style={{ fontFamily: "var(--font-data)", fontWeight: 700, fontSize: 14 }}>{s._i + 1}</span>)}
      </span>
    );
  };

  if (orientation === "vertical") {
    return (
      <div style={{ display: "flex", flexDirection: "column", ...style }}>
        {items.map((s, i) => { const k = skin(s.status); return (
          <div key={i} onClick={clickable(i) ? () => onStepClick(i) : undefined}
            style={{ display: "flex", gap: 14, cursor: clickable(i) ? "pointer" : "default" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {dot(s)}
              {i < items.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 22, background: k.line }} />}
            </div>
            <div style={{ paddingBottom: 18, paddingTop: 6 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>{s.label}</div>
              {s.meta && <div style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--color-text-secondary)" }}>{s.meta}</div>}
            </div>
          </div>
        ); })}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start", ...style }}>
      {items.map((s, i) => { const k = skin(s.status); return (
        <React.Fragment key={i}>
          <div onClick={clickable(i) ? () => onStepClick(i) : undefined}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0, width: 92, cursor: clickable(i) ? "pointer" : "default" }}>
            {dot(s)}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>{s.label}</div>
              {s.meta && <div style={{ fontFamily: "var(--font-data)", fontSize: 11, color: "var(--color-text-secondary)" }}>{s.meta}</div>}
            </div>
          </div>
          {i < items.length - 1 && <span style={{ flex: 1, height: 2, background: k.line, marginTop: 17 }} />}
        </React.Fragment>
      ); })}
    </div>
  );
}
