/* DailyUp UI Kit — Rapports (reports / syntheses) list screen. */
const { Card, Badge, Chip, Avatar, Button, IconButton, Icon, Tooltip, ButtonGroup } = window.DuKit;

const STATUS = {
  creation:    { tone: "neutral", label: "Création" },
  validation:  { tone: "warning", label: "Validation" },
  production:  { tone: "info",    label: "Production" },
  facturation: { tone: "yes",     label: "Facturation" },
};

const REPORTS = [
  { id: 1, title: "Analyse des risques — projet Bêta", client: "Globex Corporation", site: "XEFI BORDEAUX EST", status: "validation", due: "12 fév", people: ["LV", "JB", "SR"] },
  { id: 2, title: "Comité de direction — juin 2026", client: "ORANGE", site: "XEFI LONS", status: "production", due: "18 fév", people: ["LV", "MD"] },
  { id: 3, title: "Synthèse webinaire produit", client: "Xstream Protection", site: "XEFI LONS", status: "facturation", due: "02 fév", people: ["JB", "SR", "AL", "MD"] },
  { id: 4, title: "Migration et informations", client: "CODIR", site: "XEFI BORDEAUX EST", status: "creation", due: "24 fév", people: ["LV"] },
  { id: 5, title: "Vision produit et objectifs clés", client: "DailyUp", site: "XEFI LONS", status: "validation", due: "27 fév", people: ["JB", "AL"] },
];

function AvatarGroup({ people }) {
  return (
    <div style={{ display: "flex" }}>
      {people.slice(0, 3).map((p, i) => (
        <span key={i} style={{ marginLeft: i ? -8 : 0, borderRadius: "999px", boxShadow: "0 0 0 2px var(--color-background-surface)" }}>
          <Avatar initials={p} size="sm" />
        </span>
      ))}
      {people.length > 3 && (
        <span style={{ marginLeft: -8, borderRadius: "999px", boxShadow: "0 0 0 2px var(--color-background-surface)" }}>
          <Avatar number={"+" + (people.length - 3)} size="sm" />
        </span>
      )}
    </div>
  );
}

function ReportsScreen({ onOpen, query = "" }) {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { id: "all", label: "Tous" },
    { id: "validation", label: "En validation" },
    { id: "production", label: "En production" },
    { id: "facturation", label: "À facturer" },
  ];
  const rows = REPORTS.filter(r =>
    (filter === "all" || r.status === filter) &&
    (r.title.toLowerCase().includes(query.toLowerCase()) || r.client.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ButtonGroup size="s" value={filter} onChange={setFilter}
          items={filters.map(f => ({ id: f.id, label: f.label }))} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <Button variant="secondary" size="md" leftIcon={<Icon name="ExpandMoreStyleRound" size={18} />}>Filtres</Button>
          <Button variant="brand" size="md" leftIcon={<Icon name="Plus" size={18} />}>Nouveau rapport</Button>
        </div>
      </div>

      <Card padding="0">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 110px 120px 56px", padding: "14px 20px", borderBottom: "1px solid var(--color-border-subtle)" }}>
          {["Rapport", "Statut", "Échéance", "Parties", ""].map((h, i) => (
            <span key={i} className="du-overline" style={{ alignSelf: "center" }}>{h}</span>
          ))}
        </div>
        {rows.map((r, idx) => (
          <div key={r.id} onClick={() => onOpen && onOpen(r)}
            style={{
              display: "grid", gridTemplateColumns: "1fr 160px 110px 120px 56px", alignItems: "center",
              padding: "16px 20px", cursor: "pointer",
              borderBottom: idx < rows.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
              transition: "background var(--motion-fast) var(--ease-standard)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-background-surface-sunken)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0, paddingRight: 16 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-text-secondary)" }}>{r.client} · {r.site}</span>
            </div>
            <div><Badge tone={STATUS[r.status].tone} dot>{STATUS[r.status].label}</Badge></div>
            <span style={{ fontFamily: "var(--font-data)", fontSize: 14, color: "var(--color-text-secondary)" }}>{r.due}</span>
            <AvatarGroup people={r.people} />
            <Tooltip content="Options" direction="left">
              <IconButton aria-label="Options" icon={<Icon name="MoreVertStyleRound" size={20} />} onClick={(e) => e.stopPropagation()} />
            </Tooltip>
          </div>
        ))}
        {rows.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)" }}>Aucun rapport ne correspond à votre recherche.</div>
        )}
      </Card>
    </div>
  );
}

Object.assign(window, { ReportsScreen, STATUS });
