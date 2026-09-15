/* Kit UI MyEddy — détail de document, tâches, profil.
   Reconstruction depuis les exports PNG du Figma « My-Eddy-Ancien-Design ». */

const { Icon } = window.XEFIDesignSystem_6d8aa5;
const { ME, StatusChip, AppHeader, Astuce, Row, PrimaryButton, GhostButton, DocThumb, Scroll } = window;

/* ── Détail d'un document ──────────────────────────────────────────────── */
function DocumentDetailScreen({ onClose }) {
  const [date, setDate] = React.useState("");
  const errDate = date.trim() === "";
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
        <button type="button" aria-label="Retour" onClick={onClose} style={{ width: 44, height: 44, flex: "none",
          borderRadius: 13, background: ME.card, border: "1px solid " + ME.line, color: "#C3C3C4", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="chevron-left" size={20} /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#C2C2C3", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Facture_Acme_0425.pdf</div>
          <div style={{ fontSize: 13, color: "#DBDBDC" }}>Comptabilité · Factures</div>
        </div>
        <button type="button" aria-label="Fermer" onClick={onClose} style={{ width: 44, height: 44, flex: "none",
          borderRadius: 13, background: ME.card, border: "1px solid " + ME.line, color: ME.ink, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={19} /></button>
      </div>

      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <DocumentBackdrop />
        <Scroll padBottom={100}>
        <Panel>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Status</span>
            <StatusChip label="Commenté" />
            <span style={{ fontSize: 13, color: ME.ink2, fontWeight: 600 }}>+3</span>
          </div>
        </Panel>

        <Panel>
          <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 16 }}>Information général</div>
          <Field label="N° de facture" value="FAGG210748" state="ok" />
          <Field label="Type" value="Facture" state="ok" select />
          <Field label="Date" value={date} onChange={setDate} placeholder="jj/mm/aaaa" state={errDate ? "err" : "ok"} />
          <Field label="Date d'échéance" value="22/10/2021" state="ok" last />
        </Panel>

        <Panel>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Validateurs</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: ME.ink }}>ET, 2 validateurs</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {["MM", "LV"].map(i => (
              <span key={i} style={{ width: 36, height: 36, borderRadius: 999, background: ME.red, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i}</span>
            ))}
          </div>
        </Panel>

        </Scroll>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 16,
        background: "linear-gradient(180deg,rgba(245,245,246,0) 0%,#F5F5F6 34%)" }}>
        <PrimaryButton onClick={onClose}>Sauvegarder</PrimaryButton>
      </div>
    </div>
  );
}

/* Page du document en fond d'écran. Dans la source, le détail n'est pas une pile de
   cartes sur fond gris : les panneaux de saisie flottent AU-DESSUS de la facture, qu'on
   garde sous les yeux pendant qu'on renseigne ses métadonnées. Le calque est donc une
   page blanche pleine largeur, pas une vignette rangée dans un panneau. */
function DocumentBackdrop() {
  // Valeurs peintes DIRECTEMENT aux teintes relevées sur `document-detail.png` :
  // papier #F2F2F3, traits du document #D6D6D8, trait de titre #D0D0D2.
  // Surtout pas un voile par-dessus une page blanche : composer une opacité écrase le
  // delta entre papier et traits (4/255 au lieu de ~30) et le document devient un aplat
  // uni. Les deux mesures — couleur d'interstice ET lisibilité des traces — ne sont
  // satisfaites qu'en peignant les teintes finales.
  const ligne = (w, mt = 9) => ({ display: "block", height: 6, width: w, borderRadius: 2,
    background: "#D6D6D8", marginTop: mt });
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden",
      background: "#F2F2F3", padding: "22px 20px", boxSizing: "border-box" }}>
      <span style={{ display: "block", height: 8, width: "42%", borderRadius: 2, background: "#D0D0D2" }} />
      <span style={ligne("64%", 12)} />
      <span style={ligne("52%")} />
      <div style={{ marginTop: 22, border: "1px solid #DEDEE0", borderRadius: 3, padding: 10 }}>
        <span style={{ display: "block", height: 6, width: "38%", borderRadius: 2, background: "#D0D0D2" }} />
        <span style={ligne("70%")} />
        <span style={ligne("56%")} />
      </div>
      <div style={{ marginTop: 20 }}>
        {["88%", "74%", "82%", "60%", "78%", "66%", "85%", "58%", "72%", "80%", "63%", "76%"].map((w, k) =>
          <span key={k} style={ligne(w)} />)}
      </div>
    </div>
  );
}

function Panel({ children }) {
  return <div style={{ background: ME.card, borderRadius: 16, boxShadow: ME.shadow, padding: 16 }}>{children}</div>;
}

function Field({ label, value, onChange, placeholder, state, select, last }) {
  const bad = state === "err";
  return (
    <div style={{ marginBottom: last ? 0 : 16 }}>
      <div style={{ fontSize: 13.5, color: ME.ink2, marginBottom: 7 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <input value={value} placeholder={placeholder} readOnly={!onChange}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          style={{ width: "100%", height: 50, boxSizing: "border-box", borderRadius: 10, fontFamily: ME.font,
            fontSize: 15, color: ME.ink, background: ME.card, outline: "none",
            border: "1px solid " + (bad ? "#E44B4B" : ME.line), padding: `0 ${select ? 68 : 44}px 0 14px` }} />
        <span style={{ position: "absolute", right: select ? 40 : 14, top: 15,
          color: bad ? "#E44B4B" : "#1FAE66", display: "flex" }}>
          <Icon name={bad ? "ErrorOutlineStyleOutlined" : "CheckCircleStyleOutlined"} size={20} />
        </span>
        {select && <span style={{ position: "absolute", right: 14, top: 16, color: ME.ink2 }}><Icon name="ChevronDown" size={18} /></span>}
      </div>
    </div>
  );
}

/* ── Mes tâches ────────────────────────────────────────────────────────── */
const ONGLETS = [
  { id: "traiter", l1: "À traiter", n: 2 },
  { id: "signature", l1: "En attente de", l2: "Signature" },
  { id: "validation", l1: "En attente de", l2: "Validation" },
];
const TACHES = [
  { nom: "Facture_Acme_0425.pdf", ech: "Échéance 28 avril", statuts: ["En attente de validation", "Signé"] },
  { nom: "Contrat_Bail.pdf", ech: "Échéance 28 avril", statuts: ["En attente de validation"] },
];

function TachesScreen({ onOpen }) {
  const [onglet, setOnglet] = React.useState("traiter");
  const [astuce, setAstuce] = React.useState(true);
  return (
    <>
      <AppHeader title="Mes tâches" />
      <Scroll>
        <div style={{ display: "flex", gap: 4, padding: 4, background: "#E7E7EA", borderRadius: 14 }}>
          {ONGLETS.map(o => {
            const on = o.id === onglet;
            return (
              <button key={o.id} type="button" onClick={() => setOnglet(o.id)} aria-pressed={on}
                style={{ flex: 1, minHeight: 48, border: "none", cursor: "pointer", borderRadius: 11, padding: "6px 4px",
                  background: on ? ME.card : "transparent", color: on ? ME.ink : ME.ink2, fontFamily: ME.font,
                  boxShadow: on ? "0 1px 2px rgba(0,0,0,0.10)" : "none",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: on ? 700 : 500 }}>
                  {o.l1}
                  {o.n && <span style={{ minWidth: 20, height: 20, borderRadius: 999, background: ME.red, color: "#fff",
                    fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{o.n}</span>}
                </span>
                {o.l2 && <span style={{ fontSize: 13.5, fontWeight: 700 }}>{o.l2}</span>}
              </button>
            );
          })}
        </div>
        {astuce && <Astuce onClose={() => setAstuce(false)}>maintenez un document appuyé pour activer la sélection multiple.</Astuce>}
        {TACHES.map(t => (
          <div key={t.nom} style={{ background: ME.card, borderRadius: ME.radius, boxShadow: ME.shadow, padding: 14 }}>
            <button type="button" onClick={onOpen} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12,
              border: "none", background: "transparent", cursor: "pointer", textAlign: "left", padding: 0 }}>
              <DocThumb />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: ME.ink }}>{t.nom}</span>
                <span style={{ display: "block", fontSize: 13, color: ME.ink2, marginTop: 2 }}>{t.ech}</span>
              </span>
              <span style={{ color: ME.ink3 }}><Icon name="chevron-right" size={20} /></span>
            </button>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "12px 0" }}>
              {t.statuts.map(s => <StatusChip key={s} label={s} />)}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <GhostButton icon="x">Refuser</GhostButton>
              <PrimaryButton icon="check">Valider</PrimaryButton>
            </div>
          </div>
        ))}
      </Scroll>
    </>
  );
}

/* ── Profil ────────────────────────────────────────────────────────────── */
const PROFIL = [
  { icon: "bell", label: "Notifications" },
  { icon: "fingerprint", label: "Reconnaissance digitale", toggle: true },
  { icon: "printer", label: "Code imprimante" },
  { icon: "bot", label: "Gestion de vos MyEddy" },
  { icon: "circle-question-mark", label: "Questions fréquentes" },
  { icon: "file-text", label: "Conditions générales d'utilisation" },
  { icon: "shield", label: "Politique de confidentialité" },
  { icon: "scale", label: "Mentions légales" },
];

function ProfilScreen() {
  const [bio, setBio] = React.useState(true);
  return (
    <>
      <AppHeader title="Profil" />
      <Scroll>
        <div style={{ background: ME.card, borderRadius: 16, boxShadow: ME.shadow, padding: 14,
          display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 56, height: 56, borderRadius: 14, background: ME.red, color: "#fff", flex: "none",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 800 }}>MM</span>
          <span style={{ flex: 1 }}>
            <span style={{ display: "block", fontSize: 17, fontWeight: 800 }}>Mélissa Martin</span>
            <span style={{ display: "block", fontSize: 13.5, color: ME.ink2, marginTop: 2 }}>m.martin@eddy.fr</span>
          </span>
          <span style={{ color: ME.ink3 }}><Icon name="chevron-right" size={20} /></span>
        </div>

        <div style={{ background: ME.card, borderRadius: 16, boxShadow: ME.shadow, overflow: "hidden" }}>
          {PROFIL.map((r, i) => (
            <Row key={r.label} last={i === PROFIL.length - 1} title={r.label}
              leading={<span style={{ width: 40, height: 40, flex: "none", borderRadius: 11, background: "#F2F2F2",
                color: ME.ink, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={r.icon} size={19} /></span>}
              trailing={r.toggle
                ? <Toggle on={bio} onToggle={() => setBio(!bio)} />
                : undefined} />
          ))}
        </div>

        <div style={{ background: ME.card, borderRadius: 16, boxShadow: ME.shadow, overflow: "hidden" }}>
          <Row last title={<span style={{ color: ME.red }}>Déconnexion</span>}
            leading={<span style={{ width: 40, height: 40, flex: "none", borderRadius: 11, background: "#FBDEE0",
              color: ME.red, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="power" size={19} /></span>} />
        </div>
      </Scroll>
    </>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{ width: 48, height: 28, flex: "none", borderRadius: 999, border: "none", cursor: "pointer", padding: 3,
        background: on ? ME.red : "#D6D6DA", display: "flex", justifyContent: on ? "flex-end" : "flex-start",
        transition: "background 160ms cubic-bezier(0.4,0,0.2,1)" }}>
      <span style={{ width: 22, height: 22, borderRadius: 999, background: "#fff", display: "block" }} />
    </button>
  );
}

/* État vide — motif relevé sur `assets/screens/myeddy/classeurs-vide.png` : cartes
   fantômes en squelette délavé derrière le message, titre gras sur deux lignes sans
   icône, sous-titre orienté action, puis les actions empilées — une rouge pleine, les
   autres en contour.

   ⚠ L'onglet Corbeille n'a AUCUNE maquette dans les 118 captures : cet écran extrapole
   le motif d'état vide observé ailleurs. Aucune règle produit n'y est affirmée — pas de
   délai de rétention, pas de comportement inventé. */
function CorbeilleScreen() {
  return (
    <>
      <AppHeader title="Corbeille" />
      <Scroll>
        <EmptyState
          titre={<>Aucun document<br />dans la corbeille</>}
          sous="Les documents que vous supprimez se retrouvent ici."
          actions={[{ label: "Parcourir les armoires", primaire: true }]} />
      </Scroll>
    </>
  );
}

/* Motif d'état vide MyEddy, réutilisable : squelettes fantômes + message + actions. */
function EmptyState({ titre, sous, actions = [] }) {
  return (
    <div style={{ position: "relative", paddingTop: 8 }}>
      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 8, display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: 12,
        // La source efface les cartes fantômes en fondu vers le blanc : rien de gris ne
        // rend sous le sous-titre ni sous les boutons. Un masque en dégradé reproduit
        // cette rampe (#F7F7F7 en haut → blanc pur au niveau du titre), là où une
        // opacité uniforme laissait des cartes visibles derrière le texte.
        WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 34%, transparent 52%)",
        maskImage: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 34%, transparent 52%)" }}>
        {[0, 1, 2, 3].map(i => <GhostCard key={i} />)}
      </div>
      <div style={{ position: "relative", paddingTop: 66, textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: "30px", color: ME.ink }}>{titre}</div>
        <div style={{ fontSize: 14.5, lineHeight: "21px", color: ME.ink2, margin: "12px 18px 0" }}>{sous}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24, padding: "0 16px" }}>
          {actions.map(a => a.primaire
            ? <PrimaryButton key={a.label} icon="Plus" onClick={a.onClick}>{a.label}</PrimaryButton>
            : <GhostButton key={a.label} icon="Plus" onClick={a.onClick}>{a.label}</GhostButton>)}
        </div>
      </div>
    </div>
  );
}

function GhostCard() {
  return (
    <div style={{ background: ME.card, borderRadius: ME.radius, padding: 14,
      height: 116, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: "#F2F2F2", display: "block" }} />
        <span style={{ width: 20, height: 20, borderRadius: 999, background: "#F2F2F2", display: "block" }} />
      </div>
      <span style={{ display: "block", height: 10, width: "70%", borderRadius: 5, background: "#F2F2F2", marginTop: 14 }} />
      <span style={{ display: "block", height: 10, width: "45%", borderRadius: 5, background: "#F2F2F2", marginTop: 8 }} />
    </div>
  );
}

Object.assign(window, { DocumentDetailScreen, TachesScreen, ProfilScreen, CorbeilleScreen, DocumentBackdrop, EmptyState, GhostCard, Panel, Field, Toggle });
