const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Button = (props) => React.createElement(__ns().Button, props);
const IconButton = (props) => React.createElement(__ns().IconButton, props);
const Icon = (props) => React.createElement(__ns().Icon, props);
const Input = (props) => React.createElement(__ns().Input, props);
const Select = (props) => React.createElement(__ns().Select, props);
const Badge = (props) => React.createElement(__ns().Badge, props);
const SearchInput = (props) => React.createElement(__ns().SearchInput, props);
const FileIcon = (props) => React.createElement(__ns().FileIcon, props);
const Checkbox = (props) => React.createElement(__ns().Checkbox, props);

function NoteDetail({note, rows, onAdd, onDelete, onSubmit}) {
  const [checked, setChecked] = React.useState([]);
  const toggle = (id) => setChecked((c) => c.indexOf(id) === -1 ? c.concat(id) : c.filter((x) => x !== id));
  return (
    <section style={{flex: 1, minWidth: 900, background: "var(--white)", borderRadius: "var(--radius-module)", boxShadow: "var(--shadow-module-2)", padding: 24, display: "flex", flexDirection: "column", gap: 20}}>
      <div style={{display: "flex", alignItems: "flex-start", gap: 16}}>
        <div>
          <h1 style={{fontSize: 20, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)", margin: 0}}>Notes en cours</h1>
          <div style={{display: "flex", alignItems: "center", gap: 10, marginTop: 10}}>
            <Badge status="brouillon">Note de frais</Badge>
            <span style={{width: 1, height: 14, background: "var(--grey-100)"}} />
            <Badge status="brouillon">Ouverte</Badge>
          </div>
        </div>
        <div style={{marginLeft: "auto", display: "flex", gap: 8}}>
          <IconButton icon={<Icon name="square-pen" size={18} />} label="Modifier" size={40} />
          <IconButton icon={<Icon name="TrashCanOutline" size={18} />} label="Supprimer la note" size={40} onClick={onDelete} />
          <Button variant="primary" size={40} icon={<Icon name="send-horizontal" size={16} />} iconPosition="left" onClick={onSubmit}>Soumettre la note</Button>
        </div>
      </div>

      <div style={{display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap"}}>
        <div style={{flex: "1 1 380px", minWidth: 340, display: "flex", flexDirection: "column", gap: 12}}>
          <div style={{display: "flex", gap: 12}}>
            <div style={{flex: 1}}><Input label="Titre*" defaultValue={note.periode} size={40} /></div>
            <div style={{flex: 1}}><Input label="Période*" defaultValue={note.periode} size={40} /></div>
            <div style={{flex: 1}}><Input label="Site*" defaultValue="Lyon" size={40} /></div>
          </div>
          <div className="da-field">
            <span className="da-field__label">Descriptif</span>
            <textarea placeholder="Ajouter un descritif" rows={4}
              style={{border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-field)", padding: 12, resize: "vertical",
                fontFamily: "var(--font-core)", fontSize: 14, color: "var(--text-body)", outline: "none"}} />
          </div>
        </div>
        <div style={{display: "flex", gap: 24, alignItems: "flex-start", flex: "2 1 560px"}}>
          <div style={{fontSize: 24, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)", paddingTop: 24, whiteSpace: "nowrap"}}>{note.total}</div>
          <ExpenseBreakdown />
        </div>
      </div>

      <div style={{height: 1, background: "var(--grey-50)"}} />

      <div style={{display: "flex", alignItems: "center", gap: 12}}>
        <span style={{fontSize: 18, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)"}}>Dépense(s)</span>
        <span style={{fontSize: 14, color: "var(--text-muted)"}}>({rows.length})</span>
        <span style={{marginLeft: "auto"}}>
          <button onClick={onAdd} style={{appearance: "none", cursor: "pointer", height: 36, padding: "0 20px", borderRadius: "var(--radius-pill)",
            border: "1px solid var(--primary)", background: "var(--white)", color: "var(--primary)", fontFamily: "var(--font-core)", fontSize: 14}}>
            Ajouter nouvelle(s) dépense(s)</button>
        </span>
      </div>

      <div style={{display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap"}}>
        <div style={{width: 190}}><SearchInput size={40} placeholder="Motif" /></div>
        <div style={{width: 180}}><Select options={["Carburant", "Hôtel", "Restauration"]} placeholder="Type" size={40} /></div>
        <div style={{width: 120}}><Input placeholder="Montant min" size={40} /></div>
        <span style={{color: "var(--text-muted)"}}>-</span>
        <div style={{width: 120}}><Input placeholder="Montant max" size={40} /></div>
        <div style={{width: 170}}><Select options={["5,5 %", "10 %", "20 %"]} placeholder="TVA" size={40} /></div>
        <div style={{width: 190}}><Input placeholder="Période" size={40} icon={<Icon name="calendar" size={16} />} /></div>
        <IconButton icon={<Icon name="filter-x" size={18} />} label="Réinitialiser les filtres" size={40} variant="ghost" />
      </div>

      <table className="da-grid">
        <thead>
          <tr>
            <th style={{width: 44}}></th>
            <th style={{width: 120}}>Motif</th><th>Type</th>
            <th style={{width: 110}}>Montant</th><th style={{width: 110}}>TVA</th>
            <th style={{width: 120}}>Date</th><th style={{width: 110}}>Statut</th>
            <th style={{width: 170}}>Justificatif</th><th style={{width: 120}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td><Checkbox checked={checked.indexOf(r.id) !== -1} onChange={() => toggle(r.id)} /></td>
              <td>{r.motif}</td>
              <td><span style={{display: "inline-flex", alignItems: "center", gap: 8}}><TypeGlyph type={r.type} />{r.type.label}</span></td>
              <td>{r.montant}</td>
              <td><span style={{color: "var(--text-muted)"}}>{r.tva}{r.tva2 ? <span style={{margin: "0 8px", color: "var(--grey-100)"}}>|</span> : null}{r.tva2}</span></td>
              <td>{r.date}</td>
              <td><Badge status="brouillon" /></td>
              <td><span style={{display: "inline-flex", alignItems: "center", gap: 8}}><FileIcon type="jpg" size={16} basePath="../../assets" /><a href="#justificatif">{r.fichier}</a></span></td>
              <td>
                <span style={{display: "flex", gap: 10, color: "var(--text-body)"}}>
                  <Icon name="download" size={18} />
                  <Icon name="square-pen" size={18} />
                  <span style={{color: "var(--primary)"}}><Icon name="TrashCanOutline" size={18} /></span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
Object.assign(window, {NoteDetail});
