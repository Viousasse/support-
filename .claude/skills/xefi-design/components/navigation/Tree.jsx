import React from "react";

/**
 * DailyUp Tree — collapsible hierarchy (file trees, nav, nested categories).
 * nodes: [{ id, label, icon?, children? }]. Self-manages expand state;
 * `onSelect(node)` fires on leaf/label click. `defaultExpanded` is a set of ids.
 */
export function Tree({ nodes = [], onSelect, defaultExpanded = [], selectedId, style = {} }) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
  const toggle = (id) => setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const renderNode = (node, depth) => {
    const hasChildren = node.children && node.children.length > 0;
    const open = expanded.has(node.id);
    const sel = node.id === selectedId;
    return (
      <div key={node.id}>
        <div
          onClick={() => { if (hasChildren) toggle(node.id); onSelect && onSelect(node); }}
          style={{
            display: "flex", alignItems: "center", gap: 8, height: 34, paddingRight: 10,
            paddingLeft: 10 + depth * 18, borderRadius: "var(--radius-sm-px)", cursor: "pointer",
            background: sel ? "var(--color-action-secondary-active)" : "transparent",
            color: "var(--color-text-primary)",
          }}
          onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "var(--color-action-secondary-hover)"; }}
          onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}>
          <span style={{ width: 16, display: "inline-flex", flexShrink: 0, color: "var(--color-icon-muted)" }}>
            {hasChildren && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform var(--motion-fast) var(--ease-standard)" }}>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          {node.icon && <span style={{ display: "inline-flex", flexShrink: 0, color: "var(--color-icon-default)" }}>{node.icon}</span>}
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: sel ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{node.label}</span>
        </div>
        {hasChildren && open && node.children.map(c => renderNode(c, depth + 1))}
      </div>
    );
  };

  return <div style={{ display: "flex", flexDirection: "column", ...style }}>{nodes.map(n => renderNode(n, 0))}</div>;
}
