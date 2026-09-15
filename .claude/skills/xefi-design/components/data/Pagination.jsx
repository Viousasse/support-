import React from "react";

function pages(total, current) {
  if (total <= 5) return Array.from({length: total}, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current, "…", total];
}

export function Pagination({total = 1, page = 1, onChange, compact = false, className = ""}) {
  const arrow = (d) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
  const list = compact ? [page] : pages(total, page);
  return (
    <nav className={["da-pagination", className].filter(Boolean).join(" ")} aria-label="Pagination">
      {!compact ? <button className="da-page" disabled={page <= 1} onClick={() => onChange && onChange(page - 1)} aria-label="Page précédente">{arrow("prev")}</button> : null}
      {list.map((p, i) => p === "…"
        ? <span key={i} className="da-page da-page--ellipsis">…</span>
        : <button key={i} className={"da-page" + (p === page ? " da-page--active" : "")} onClick={() => onChange && onChange(p)}>{p}</button>)}
      {!compact ? <button className="da-page" disabled={page >= total} onClick={() => onChange && onChange(page + 1)} aria-label="Page suivante">{arrow("next")}</button> : null}
    </nav>
  );
}
