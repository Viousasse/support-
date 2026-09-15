import React from "react";

/**
 * DailyUp FileUpload — dropzone with drag-over state. Calls onFiles(FileList)
 * on drop or pick. Optional `hint` line (formats / size limit).
 */
export function FileUpload({
  onFiles,
  accept,
  multiple = false,
  hint = "PDF, MOV, AVI ou MKV · 500 Mo max",
  disabled = false,
  style = {},
}) {
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef(null);

  const handle = (files) => { if (files && files.length && onFiles) onFiles(files); };

  return (
    <div
      onClick={() => !disabled && inputRef.current && inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); if (!disabled) handle(e.dataTransfer.files); }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center",
        padding: "32px 24px", cursor: disabled ? "not-allowed" : "pointer",
        background: over ? "var(--dailyup-colors-red-lighten-5)" : "var(--color-background-surface-sunken)",
        border: `1.5px dashed ${over ? "var(--color-brand-default)" : "var(--color-border-default)"}`,
        borderRadius: "var(--radius-lg-px)", opacity: disabled ? 0.6 : 1,
        transition: "background var(--motion-fast) var(--ease-standard), border-color var(--motion-fast) var(--ease-standard)",
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "var(--radius-pill-px)", background: "var(--color-background-surface)", color: over ? "var(--color-brand-default)" : "var(--color-icon-default)", boxShadow: "var(--elevation-1)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0L7 9m5-5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", fontWeight: 600, color: "var(--color-text-primary)" }}>
        Glissez un fichier ou <span style={{ color: "var(--color-brand-default)" }}>parcourir</span>
      </span>
      {hint && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>{hint}</span>}
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} disabled={disabled}
        onChange={(e) => handle(e.target.files)} style={{ display: "none" }} />
    </div>
  );
}
