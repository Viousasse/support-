const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Card = (props) => React.createElement(__ns().Card, props);
const Badge = (props) => React.createElement(__ns().Badge, props);
const Button = (props) => React.createElement(__ns().Button, props);
const Icon = (props) => React.createElement(__ns().Icon, props);
const Chip = (props) => React.createElement(__ns().Chip, props);
const Input = (props) => React.createElement(__ns().Input, props);
const Select = (props) => React.createElement(__ns().Select, props);
const FileIcon = (props) => React.createElement(__ns().FileIcon, props);
const EmptyState = (props) => React.createElement(__ns().EmptyState, props);

function MobileExpenses({onBack}) {
  const [tab, setTab] = React.useState("liste");
  const [rows, setRows] = React.useState([
    {id: 1, date: "12/06", libelle: "Déjeuner client — Lyon", montant: "48,50 €", statut: "validee", fichier: "pdf"},
    {id: 2, date: "11/06", libelle: "Taxi gare Part-Dieu", montant: "22,00 €", statut: "soumise", fichier: "jpg"},
    {id: 3, date: "09/06", libelle: "Hôtel Marseille", montant: "268,00 €", statut: "refusee", fichier: "pdf"}
  ]);
  const [libelle, setLibelle] = React.useState("");
  const [montant, setMontant] = React.useState("");
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <div style={{display: "flex", alignItems: "center", gap: 8, padding: "8px 16px"}}>
        <button onClick={onBack} style={{appearance: "none", border: 0, background: "none", cursor: "pointer", color: "var(--text-body)", display: "flex"}}>
          <Icon name="chevron-left" size={22} />
        </button>
        <span style={{fontSize: 18, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)"}}>Notes de frais</span>
      </div>
      <div style={{flex: 1, overflow: "auto", padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 12}}>
        {tab === "liste" ? (
          <React.Fragment>
            <Card flat>
              <div style={{fontSize: 12, color: "var(--text-muted)"}}>À rembourser — juin</div>
              <div style={{fontSize: 24, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)", marginTop: 4}}>338,50 €</div>
            </Card>
            <div style={{display: "flex", gap: 8, overflowX: "auto"}}>
              <Chip selected>Toutes</Chip><Chip>En attente</Chip><Chip>Validée</Chip><Chip>Refusée</Chip>
            </div>
            {rows.length ? rows.map((r) => (
              <Card key={r.id} flat style={{padding: 12}}>
                <div style={{display: "flex", alignItems: "center", gap: 12}}>
                  <FileIcon type={r.fichier} size={28} basePath="../../assets" />
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 14, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{r.libelle}</div>
                    <div style={{fontSize: 12, color: "var(--text-muted)", marginTop: 2}}>{r.date}</div>
                  </div>
                  <div style={{textAlign: "right"}}>
                    <div style={{fontSize: 14, color: "var(--text-title)"}}>{r.montant}</div>
                    <div style={{marginTop: 4}}><Badge status={r.statut} /></div>
                  </div>
                </div>
              </Card>
            )) : <EmptyState icon={<Icon name="receipt" size={32} />} title="Aucune note de frais" description="Créez votre première note." />}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Input label="Libellé" placeholder="Déjeuner client — Lyon" size={48} value={libelle} onChange={(e) => setLibelle(e.target.value)} />
            <Input label="Montant TTC" placeholder="Saisissez un montant" size={48} value={montant} onChange={(e) => setMontant(e.target.value)} icon={<Icon name="receipt-euro" size={16} />} />
            <Select label="Catégorie" options={["Repas", "Transport", "Hébergement", "Péage"]} size={48} />
            <div style={{border: "1px dashed var(--grey-200)", borderRadius: "var(--radius-field)", padding: 28, textAlign: "center", color: "var(--text-muted)", fontSize: 14}}>
              <Icon name="camera" size={22} /><div style={{marginTop: 6}}>Photographier le justificatif</div>
            </div>
            <Button block size={48} icon={<Icon name="Check" size={16} />}
              disabled={!libelle || !montant}
              onClick={() => { setRows([{id: Date.now(), date: "12/06", libelle, montant: montant.replace(".", ",") + " €", statut: "brouillon", fichier: "jpg"}, ...rows]); setLibelle(""); setMontant(""); setTab("liste"); }}>Enregistrer</Button>
          </React.Fragment>
        )}
      </div>
      <nav style={{display: "flex", borderTop: "1px solid var(--grey-100)", background: "var(--white)"}}>
        {[{id: "liste", label: "Mes dépenses", icon: "list"}, {id: "saisie", label: "Ajouter", icon: "plus"}].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{flex: 1, appearance: "none", border: 0, background: "none", padding: "10px 0", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              color: tab === t.id ? "var(--primary)" : "var(--text-muted)"}}>
            <Icon name={t.icon} size={20} /><span style={{fontSize: 11}}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
Object.assign(window, {MobileExpenses});
