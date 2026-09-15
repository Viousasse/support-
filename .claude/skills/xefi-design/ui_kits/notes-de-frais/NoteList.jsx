const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Badge = (props) => React.createElement(__ns().Badge, props);
const IconButton = (props) => React.createElement(__ns().IconButton, props);
const Icon = (props) => React.createElement(__ns().Icon, props);

function NoteList({notes, selected, onSelect, onCreate}) {
  const [tab, setTab] = React.useState("ndf");
  return (
    <aside style={{width: 280, flex: "none", background: "var(--white)", borderRadius: "var(--radius-module)", boxShadow: "var(--shadow-module-2)", padding: 16, alignSelf: "flex-start"}}>
      <div style={{display: "flex", alignItems: "center", marginBottom: 16}}>
        <span style={{fontSize: 16, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)"}}>Vos notes</span>
        <span style={{marginLeft: "auto"}}>
          <IconButton icon={<Icon name="Plus" size={16} />} label="Créer une note" size={30}
            onClick={onCreate} style={{background: "var(--primary)", color: "var(--white)", borderColor: "var(--primary)"}} />
        </span>
      </div>
      <div style={{display: "flex", gap: 4, background: "var(--white)", border: "1px solid var(--grey-50)", borderRadius: "var(--radius-pill)", padding: 4, marginBottom: 12}}>
        {[{id: "ndf", label: "Note de Frais (4)"}, {id: "cb", label: "CB Pro (4)"}].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{flex: 1, appearance: "none", border: 0, cursor: "pointer", height: 32, borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-core)", fontSize: 13,
              background: tab === t.id ? "var(--primary)" : "transparent",
              color: tab === t.id ? "var(--white)" : "var(--text-muted)",
              fontWeight: tab === t.id ? "var(--fw-extrabold)" : "var(--fw-regular)"}}>{t.label}</button>
        ))}
      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
        {notes.map((n) => (
          <button key={n.id} onClick={() => onSelect(n.id)}
            style={{appearance: "none", border: 0, cursor: "pointer", textAlign: "left", padding: "12px 12px", borderRadius: 8,
              background: n.id === selected ? "var(--grey-50)" : "transparent", display: "flex", flexDirection: "column", gap: 6}}>
            <span style={{display: "flex", alignItems: "center", gap: 8}}>
              <span style={{fontSize: 14, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)"}}>{n.periode}</span>
              <span style={{marginLeft: "auto"}}><Badge status={n.statut}>{n.statutLabel}</Badge></span>
            </span>
            <span style={{display: "flex", alignItems: "center", gap: 8}}>
              <span style={{fontSize: 13, color: "var(--text-muted)"}}>{n.count} dépenses</span>
              <span style={{marginLeft: "auto", fontSize: 14, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)"}}>{n.total}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
Object.assign(window, {NoteList});
