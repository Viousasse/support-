/* DailyUp UI Kit — report detail: agenda topics, stakeholders, history. */
const { Card, Badge, Button, IconButton, Avatar, Icon, Tooltip, ListItem } = window.DuKit;

const SUJETS = [
  { n: 1, title: "Migration et informations", people: "CODIR, Lorick Vacher, Aloïs Bonnet" },
  { n: 2, title: "Vision produit et objectifs clés", people: "DailyUp, Jérémy Berthon et Brigitte R." },
  { n: 3, title: "Plan de production T3", people: "XEFI BORDEAUX EST" },
];

const STAGES = [
  { id: "creation", label: "Création", icon: "FileSign", date: "02 fév", done: true },
  { id: "validation", label: "Validation", icon: "Check", date: "08 fév", done: true },
  { id: "production", label: "Production", icon: "CogOutline", date: "En cours", current: true },
  { id: "facturation", label: "Facturation", icon: "CashCheck", date: "—" },
];

function HistoryTimeline() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {STAGES.map((s, i) => {
        const color = s.done ? "var(--color-feedback-success-text)" : s.current ? "var(--dailyup-colors-blue-darken-1)" : "var(--color-border-default)";
        const bg = s.done ? "var(--color-feedback-success-surface)" : s.current ? "var(--dailyup-colors-blue-lighten-5)" : "var(--color-background-surface-sunken)";
        return (
          <div key={s.id} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "999px", background: bg, color, flexShrink: 0 }}>
                <Icon name={s.icon} size={18} />
              </span>
              {i < STAGES.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 22, background: s.done ? "var(--color-feedback-success-border)" : "var(--color-border-default)" }} />}
            </div>
            <div style={{ paddingBottom: 18, paddingTop: 6 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--color-text-secondary)" }}>{s.date}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReportDetail({ report, onBack, onDelete, onComment }) {
  const r = report || { title: "Analyse des risques — projet Bêta", client: "Globex Corporation", site: "XEFI BORDEAUX EST", status: "production" };
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <IconButton variant="secondary" aria-label="Retour" icon={<Icon name="ChevronDown" size={20} style={{ transform: "rotate(90deg)" }} />} onClick={onBack} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: "var(--color-text-primary)" }}>{r.title}</h2>
            <Badge tone="info" dot>Production</Badge>
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-secondary)" }}>{r.client} · {r.site}</span>
        </div>
        <Tooltip content="Supprimer" direction="bottom">
          <IconButton aria-label="Supprimer" icon={<Icon name="TrashCanOutline" size={20} />} onClick={onDelete} />
        </Tooltip>
        <Button variant="secondary">Modifier</Button>
        <Button variant="brand" leftIcon={<Icon name="Check" size={18} />}>Valider</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card padding="20px">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span className="du-h3">Sujets</span>
              <Icon name="ChevronUp" size={22} style={{ color: "var(--color-icon-default)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SUJETS.map((s, i) => (
                <div key={s.n} style={{ display: "flex", gap: 14, paddingTop: i ? 14 : 0, paddingBottom: 14, borderTop: i ? "1px solid var(--color-border-subtle)" : "none" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, flexShrink: 0, borderRadius: "var(--radius-md-px)", background: "var(--color-background-surface-sunken)", border: "1px solid var(--color-border-default)", fontFamily: "var(--font-data)", fontWeight: 600, color: "var(--color-text-primary)" }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{s.title}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--dailyup-colors-blue-grey-lighten-1)" }}>Parties prenantes : {s.people}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="20px">
            <span className="du-h3" style={{ display: "block", marginBottom: 14 }}>Commentaires</span>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Avatar initials="SR" size="sm" />
              <div style={{ background: "var(--color-background-surface-sunken)", borderRadius: "var(--radius-md-px)", padding: "10px 14px", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>Sacha Rosenthal <span style={{ fontWeight: 400, color: "var(--color-text-secondary)" }}>· il y a 2 h</span></div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-primary)", marginTop: 2 }}>La ligne « webinaire produit » peut être facturée dès la production terminée.</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Avatar initials="LV" size="sm" />
              <input placeholder="Ajouter un commentaire…" onKeyDown={(e) => { if (e.key === "Enter" && onComment) onComment(); }}
                style={{ flex: 1, height: 40, padding: "0 14px", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-pill-px)", outline: "none", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-primary)" }} />
              <Button onClick={onComment}>Publier</Button>
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card padding="20px">
            <span className="du-h3" style={{ display: "block", marginBottom: 14 }}>Parties prenantes</span>
            <ListItem leading={<Avatar initials="LV" size="sm" />} title="Lorick Vacher" subtitle="Responsable" />
            <ListItem leading={<Avatar initials="JB" size="sm" />} title="Jérémy Berthon" subtitle="Production" />
            <ListItem leading={<Avatar initials="SR" size="sm" />} title="Sacha Rosenthal" subtitle="Validation" />
          </Card>
          <Card padding="20px">
            <span className="du-h3" style={{ display: "block", marginBottom: 16 }}>Historique</span>
            <HistoryTimeline />
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReportDetail });
