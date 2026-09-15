import React from "react";

const STATUS = {
  validee: {bg: "var(--status-validee-bg)", fg: "var(--status-validee-fg)", label: "Validée"},
  soumise: {bg: "var(--status-soumise-bg)", fg: "var(--status-soumise-fg)", label: "Soumise"},
  corrigee: {bg: "var(--status-corrigee-bg)", fg: "var(--status-corrigee-fg)", label: "Corrigée"},
  refusee: {bg: "var(--status-refusee-bg)", fg: "var(--status-refusee-fg)", label: "Refusée"},
  brouillon: {bg: "var(--status-brouillon-bg)", fg: "var(--status-brouillon-fg)", label: "Brouillon"},
  enpaie: {bg: "var(--status-enpaie-bg)", fg: "var(--status-enpaie-fg)", label: "En paie"}
};

export function Badge({status = "brouillon", children, className = "", ...rest}) {
  const s = STATUS[status] || STATUS.brouillon;
  return <span className={["da-badge", className].filter(Boolean).join(" ")} style={{background: s.bg, color: s.fg}} {...rest}>{children || s.label}</span>;
}
