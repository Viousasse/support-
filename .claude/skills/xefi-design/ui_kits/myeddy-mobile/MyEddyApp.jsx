/* Kit UI MyEddy — enchaînement des écrans.
   Lancement → connexion → tableau de bord, puis navigation par onglets,
   ouverture d'une armoire, d'un document, et feuille d'ajout. */

const { Icon } = window.XEFIDesignSystem_6d8aa5;
const { ME, PhoneFrame, TabBar, Sheet, Row, PhoneStatusBar } = window;

function MyEddyApp() {
  const [etape, setEtape] = React.useState("splash");   // splash | login | app
  const [onglet, setOnglet] = React.useState("accueil");
  const [pile, setPile] = React.useState([]);           // documents | detail
  const [sheet, setSheet] = React.useState(false);

  React.useEffect(() => {
    if (etape !== "splash") return;
    const t = setTimeout(() => setEtape("login"), 1800);
    return () => clearTimeout(t);
  }, [etape]);

  if (etape === "splash") return <PhoneFrame dark><window.SplashScreen onDone={() => setEtape("login")} /></PhoneFrame>;
  if (etape === "login") return <PhoneFrame dark><window.LoginScreen onLogin={() => setEtape("app")} /></PhoneFrame>;

  const vue = pile[pile.length - 1];
  const push = (v) => setPile(p => [...p, v]);
  const pop = () => setPile(p => p.slice(0, -1));
  const aller = (id) => { setPile([]); setOnglet(id); };

  let ecran;
  if (vue === "detail") ecran = <window.DocumentDetailScreen onClose={pop} />;
  else if (vue === "documents") ecran = <window.DocumentsScreen onBack={pop} onOpen={() => push("detail")} />;
  else if (onglet === "accueil") ecran = <window.DashboardScreen onOpenWidget={() => {}} />;
  else if (onglet === "armoires") ecran = <window.ArmoiresScreen onOpen={() => push("documents")} />;
  else if (onglet === "taches") ecran = <window.TachesScreen onOpen={() => push("detail")} />;
  else ecran = <window.CorbeilleScreen />;

  const plein = vue === "detail";

  return (
    <PhoneFrame>
      {ecran}
      {!plein && <TabBar active={onglet} onNavigate={aller} onAdd={() => setSheet(true)} />}
      <Sheet open={sheet} title="Ajouter classeur ou document" onClose={() => setSheet(false)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <ActionTile primaire icon="scan" titre="Scanner" sous="Avec la caméra" onClick={() => setSheet(false)} />
          <ActionTile icon="download" titre="Importer" sous="Photo ou fichier" onClick={() => setSheet(false)} />
        </div>
        <div style={{ background: ME.card, borderRadius: 14, border: "1px solid " + ME.line, overflow: "hidden" }}>
          <Row title="Ajouter une armoire" onClick={() => setSheet(false)}
            leading={<span style={{ color: ME.ink, display: "flex" }}><Icon name="archive" size={20} /></span>} />
          <Row last title="Ajouter un classeur" onClick={() => setSheet(false)}
            leading={<span style={{ color: ME.ink, display: "flex" }}><Icon name="folder" size={20} /></span>} />
        </div>
      </Sheet>
    </PhoneFrame>
  );
}

function ActionTile({ primaire, icon, titre, sous, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ borderRadius: 14, cursor: "pointer", padding: 14, textAlign: "left",
      fontFamily: ME.font, minHeight: 108, display: "flex", flexDirection: "column", justifyContent: "space-between",
      background: primaire ? ME.red : ME.card, color: primaire ? "#fff" : ME.ink,
      border: primaire ? "none" : "1px solid " + ME.line }}>
      <span style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
        background: primaire ? "rgba(255,255,255,0.20)" : "#FBDEE0", color: primaire ? "#fff" : ME.red }}>
        <Icon name={icon} size={19} />
      </span>
      <span style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
        <span style={{ flex: 1 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{titre}</span>
          <span style={{ display: "block", fontSize: 12.5, marginTop: 2, opacity: primaire ? 0.9 : 0.7 }}>{sous}</span>
        </span>
        <Icon name="chevron-right" size={18} />
      </span>
    </button>
  );
}

Object.assign(window, { MyEddyApp, ActionTile });
