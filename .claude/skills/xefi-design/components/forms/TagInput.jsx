import React from "react";

/**
 * DailyUp TagInput — free-form tag entry. Type and press Enter (or comma) to
 * add a tag; Backspace on an empty field removes the last. value is an array
 * of strings. Unlike Combobox (pick from a fixed list), tags are user-created.
 */
export function TagInput({
  value = [],
  onChange,
  placeholder = "Ajouter un tag…",
  label,
  max,
  style = {},
}) {
  const [draft, setDraft] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();

  const commit = (raw) => {
    const tag = raw.trim().replace(/,$/, "").trim();
    if (!tag || value.includes(tag) || (max != null && value.length >= max)) { setDraft(""); return; }
    onChange && onChange([...value, tag]);
    setDraft("");
  };
  const removeAt = (i) => onChange && onChange(value.filter((_, j) => j !== i));

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commit(draft); }
    else if (e.key === "Backspace" && !draft && value.length) removeAt(value.length - 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", ...style }}>
      {label && <label htmlFor={reactId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-label-md-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>{label}</label>}
      <div onClick={() => document.getElementById(reactId)?.focus()} style={{
        display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, minHeight: 48, padding: "6px 10px", cursor: "text",
        background: "var(--color-background-surface)", border: `1px solid ${focus ? "var(--color-border-focus)" : "var(--color-border-default)"}`,
        boxShadow: focus ? "var(--focus-ring)" : "none", borderRadius: "var(--radius-md-px)",
        transition: "border-color var(--motion-fast) var(--ease-standard), box-shadow var(--motion-fast) var(--ease-standard)",
      }}>
        {value.map((tag, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 6px 0 12px", background: "var(--color-background-surface-sunken)", color: "var(--color-text-primary)", borderRadius: "var(--radius-pill-px)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500 }}>
            {tag}
            <button type="button" aria-label={"Retirer " + tag} onClick={(e) => { e.stopPropagation(); removeAt(i); }} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, border: "none", background: "transparent", color: "var(--color-icon-muted)", cursor: "pointer" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </span>
        ))}
        <input id={reactId} value={draft} placeholder={value.length ? "" : placeholder}
          onChange={(e) => setDraft(e.target.value)} onKeyDown={onKey}
          onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); commit(draft); }}
          style={{ flex: 1, minWidth: 90, border: "none", outline: "none", background: "transparent", height: 28, fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)" }} />
      </div>
    </div>
  );
}
