import React from "react";

export function DataGrid({columns = [], rows = [], zebra = false, renderCell, className = ""}) {
  return (
    <table className={["da-grid", zebra ? "da-grid--zebra" : "", className].filter(Boolean).join(" ")}>
      <thead>
        <tr>{columns.map((c) => <th key={c.key} className={c.align === "right" ? "da-grid--num" : undefined} style={c.width ? {width: c.width} : undefined}>{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.id != null ? r.id : i}>
            {columns.map((c) => (
              <td key={c.key} className={c.align === "right" ? "da-grid--num" : undefined}>
                {renderCell ? renderCell(c, r, i) : r[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
