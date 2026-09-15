const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Card = (props) => React.createElement(__ns().Card, props);
const DataGrid = (props) => React.createElement(__ns().DataGrid, props);
const Badge = (props) => React.createElement(__ns().Badge, props);
const Button = (props) => React.createElement(__ns().Button, props);
const Icon = (props) => React.createElement(__ns().Icon, props);
const Avatar = (props) => React.createElement(__ns().Avatar, props);
const Tabs = (props) => React.createElement(__ns().Tabs, props);

function ValidationScreen({rows, onApprove, onReject}) {
  const columns = [
    {key: "collaborateur", header: "COLLABORATEUR", width: 200},
    {key: "date", header: "DATE", width: 120},
    {key: "libelle", header: "LIBELLÉ"},
    {key: "montant", header: "MONTANT", align: "right", width: 120},
    {key: "statut", header: "STATUT", width: 120},
    {key: "actions", header: "", width: 200}
  ];
  const renderCell = (c, r) => {
    if (c.key === "collaborateur") return (
      <span style={{display: "inline-flex", alignItems: "center", gap: 8}}><Avatar initials={r.initiales} size={24} />{r.collaborateur}</span>
    );
    if (c.key === "statut") return <Badge status={r.statut} />;
    if (c.key === "actions") return (
      <span style={{display: "flex", gap: 8, justifyContent: "flex-end"}}>
        <Button variant="outline" size={30} onClick={() => onReject(r)}>Refuser</Button>
        <Button variant="primary" size={30} icon={<Icon name="Check" size={14} />} onClick={() => onApprove(r)}>Valider</Button>
      </span>
    );
    return r[c.key];
  };
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 24}}>
      <div>
        <h1 style={{fontSize: 24, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)", margin: 0}}>Notes à valider</h1>
        <p style={{fontSize: 14, color: "var(--text-muted)", margin: "4px 0 0"}}>{rows.length} demandes en attente de votre décision</p>
      </div>
      <Card style={{padding: 0}}>
        <div style={{padding: "8px 16px 0"}}><Tabs tabs={["En attente", "Traitées"]} /></div>
        <DataGrid columns={columns} rows={rows} renderCell={renderCell} />
      </Card>
    </div>
  );
}
Object.assign(window, {ValidationScreen});
