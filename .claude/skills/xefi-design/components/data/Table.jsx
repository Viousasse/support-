import React from "react";

/**
 * DailyUp Table — light data table. columns: [{ key, header, width?, align?,
 * render?(row) }]. rows: array of objects. Hairline rows, hover highlight,
 * optional sticky header.
 */
export function Table({
  columns = [],
  rows = [],
  rowKey = "id",
  onRowClick,
  dense = false,
  style = {},
}) {
  const pad = dense ? "10px 16px" : "14px 20px";
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-lg-px)", background: "var(--color-background-surface)", ...style }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: c.align || "left", padding: pad, width: c.width,
                borderBottom: "1px solid var(--color-border-subtle)",
                fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                textTransform: "uppercase", color: "var(--color-text-secondary)", whiteSpace: "nowrap",
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row[rowKey] ?? ri} onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{ cursor: onRowClick ? "pointer" : "default", transition: "background var(--motion-fast) var(--ease-standard)" }}
              onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.background = "var(--color-background-surface-sunken)"; }}
              onMouseLeave={(e) => { if (onRowClick) e.currentTarget.style.background = "transparent"; }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  textAlign: c.align || "left", padding: pad,
                  borderBottom: ri < rows.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                  fontFamily: "var(--font-sans)", fontSize: "var(--body-size)", lineHeight: "var(--body-line)", color: "var(--color-text-primary)",
                }}>{c.render ? c.render(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
