/* Kit UI MyEddy — écrans d'entrée et listes.
   Reconstruction depuis les exports PNG du Figma « My-Eddy-Ancien-Design ». */

const { Icon } = window.XEFIDesignSystem_6d8aa5;
const { ME, StatusChip, AppHeader, Astuce, SearchBar, Row, PrimaryButton, GhostButton, DocThumb, Scroll } = window;

/* ── Lancement ─────────────────────────────────────────────────────────── */
function SplashScreen({ onDone }) {
  return (
    <div onClick={onDone} style={{ flex: 1, position: "relative", overflow: "hidden", cursor: "pointer",
      background: "linear-gradient(180deg,#2D2D2D 0%,#161616 55%,#000000 100%)",
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Rings />
      <img src="../../assets/logo/myeddy/myeddy-blanc.svg" alt="MyEddy" style={{ width: 168, position: "relative", zIndex: 1 }} />
    </div>
  );
}

/* Anneaux concentriques rouges — motif de fond propre à MyEddy */
function Rings({ bottom = -190 }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "50%", bottom, transform: "translateX(-50%)",
      width: 560, height: 560, opacity: 0.85 }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} style={{ position: "absolute", inset: i * 20, borderRadius: 999,
          border: "1.5px solid rgba(225,6,0," + (0.10 + i * 0.045) + ")" }} />
      ))}
    </div>
  );
}

/* ── Connexion ─────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [id, setId] = React.useState("");
  const [mdp, setMdp] = React.useState("");
  const [err, setErr] = React.useState(false);
  const pret = id.trim() && mdp.trim();
  const submit = () => { if (!pret) { setErr(true); return; } onLogin(); };

  const field = (bad) => ({ width: "100%", height: 52, borderRadius: 12, boxSizing: "border-box",
    background: "rgba(255,255,255,0.07)", border: "1px solid " + (bad ? "#FC3844" : "rgba(255,255,255,0.14)"),
    color: "#fff", fontFamily: ME.font, fontSize: 15, padding: "0 44px 0 14px", outline: "none" });
  const label = { display: "block", fontSize: 14, color: "#D9D9DE", marginBottom: 7 };

  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg,#2D2D2D 0%,#161616 60%,#000000 100%)" }}>
      <Rings bottom={-300} />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        <Scroll fill padTop={10} padBottom={24}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <img src="../../assets/logo/myeddy/myeddy-blanc.svg" alt="MyEddy" style={{ width: 150 }} />
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 18, padding: 18, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: "#fff", marginBottom: 18 }}>Connexion</div>

          <label style={label}>Identifiant</label>
          <input value={id} onChange={(e) => { setId(e.target.value); setErr(false); }}
            placeholder="Identitifant" style={{ ...field(err && !id.trim()), marginBottom: 16 }} />

          <label style={label}>Mot de passe</label>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <input type="password" value={mdp} onChange={(e) => { setMdp(e.target.value); setErr(false); }}
              placeholder="Mot de passe" style={field(err && !mdp.trim())} />
            <span style={{ position: "absolute", right: 14, top: 16, color: "#B6B6BC" }}><Icon name="eye-off" size={19} /></span>
          </div>

          <label style={label}>URL MyEddy</label>
          <input readOnly value="https://dev-webapp.xefi.fr" style={{ ...field(false), marginBottom: 18, color: "#E4E4E8" }} />

          {err && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#FC3844", fontSize: 13, marginBottom: 14 }}>
              <Icon name="triangle-alert" size={16} />Renseignez votre identifiant et votre mot de passe.
            </div>
          )}

          <button type="button" onClick={submit} style={{ width: "100%", height: 52, borderRadius: 12, border: "none",
            cursor: "pointer", fontFamily: ME.font, fontSize: 16, fontWeight: 700,
            background: pret ? ME.red : "rgba(255,255,255,0.10)", color: pret ? "#fff" : "#8A8A90" }}>Connexion</button>

          <div style={{ textAlign: "center", color: "#8D8D8D", fontSize: 13, margin: "16px 0" }}>OU</div>

          <button type="button" onClick={onLogin} style={{ width: "100%", height: 52, borderRadius: 12, border: "none",
            background: "#fff", color: "#1B1B1F", fontFamily: ME.font, fontSize: 15, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <MicrosoftMark />Continuer avec Microsoft
          </button>

          <div style={{ color: "#E4E4E8", fontSize: 14, marginTop: 18 }}>Mot de passe oublié ?</div>
          <div style={{ color: "#7C7C83", fontSize: 11.5, marginTop: 14, textAlign: "center" }}>
            Conditions générales d'utilisation · politique de confidentialité
          </div>
        </div>
        </Scroll>
      </div>
    </div>
  );
}

function MicrosoftMark() {
  return (
    <span aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "8px 8px", gap: 2, flex: "none" }}>
      <span style={{ width: 8, height: 8, background: "#F25022" }} />
      <span style={{ width: 8, height: 8, background: "#7FBA00" }} />
      <span style={{ width: 8, height: 8, background: "#00A4EF" }} />
      <span style={{ width: 8, height: 8, background: "#FFB900" }} />
    </span>
  );
}

/* ── Tableau de bord ───────────────────────────────────────────────────── */
const JAUGE = [
  { label: "- de 3 jrs", value: 74, color: "#14B8A6" },
  { label: "+ de 3 jrs", value: 74, color: "#FEB31C" },
  { label: "+ de 15 jrs", value: 74, color: "#F97316" },
  { label: "+ de 30 jrs", value: 198, color: "#FF3B53" },
];

function DashboardScreen({ onOpenWidget }) {
  return (
    <>
      <AppHeader eyebrow="Bonjour," title="Mélissa" />
      <Scroll>
        <button type="button" style={{ width: "100%", height: 44, borderRadius: 12, border: "none", background: ME.red,
          color: "#fff", fontFamily: ME.font, fontSize: 14.5, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
          <Icon name="sliders-horizontal" size={17} />Personnaliser mon tableau de bord
        </button>
        <GaugeCard title="Facture en attente d'export" onExpand={onOpenWidget} />
        <GaugeCard title="Facture en attente de validat…" onExpand={onOpenWidget} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <MiniCard icon="rotate-ccw" title="Mes fact. en attente" />
          <MiniCard icon="chart-no-axes-column-increasing" title="Top export" body={
            <ol style={{ margin: "10px 0 0", padding: "0 0 0 16px", fontSize: 13, color: ME.ink2, lineHeight: "22px" }}>
              <li>XEFI Lyon</li><li>XEFI Paris</li><li>XEFI Lille</li>
            </ol>} />
        </div>
      </Scroll>
    </>
  );
}

function GaugeCard({ title, onExpand }) {
  const total = JAUGE.reduce((s, j) => s + j.value, 0);
  return (
    <div style={{ background: ME.card, borderRadius: ME.radius, boxShadow: ME.shadow, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: "#F2F2F2", color: ME.ink2, flex: "none",
          display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="chart-pie" size={18} /></span>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 700, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{title}</span>
        <button type="button" onClick={onExpand} aria-label="Agrandir" style={{ width: 34, height: 34, flex: "none",
          borderRadius: 10, border: "1px solid " + ME.line, background: ME.card, color: "#3B5BFF", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="ArrowTopRight" size={17} /></button>
      </div>
      <Gauge total={total} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginTop: 12 }}>
        {JAUGE.map(j => (
          <div key={j.label}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: j.color, flex: "none" }} />
              <span style={{ fontSize: 15, fontWeight: 800 }}>{j.value}</span>
            </div>
            <div style={{ fontSize: 11, color: ME.ink3, marginTop: 2 }}>{j.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Jauge semi-circulaire à segments — motif de tableau de bord MyEddy */
function Gauge({ total }) {
  const R = 74, W = 17, C = 100;
  const sum = JAUGE.reduce((s, j) => s + j.value, 0);
  let a = 180;
  const arcs = JAUGE.map(j => {
    const span = (j.value / sum) * 180;
    const d = arcPath(C, C, R, a, a + span - 2.5);
    a += span;
    return { d, color: j.color };
  });
  return (
    <div style={{ position: "relative", height: 110, marginTop: 6 }}>
      <svg viewBox="0 0 200 108" style={{ width: "100%", height: "100%", display: "block" }}>
        {arcs.map((x, i) => <path key={i} d={x.d} stroke={x.color} strokeWidth={W} fill="none" strokeLinecap="round" />)}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 4, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: ME.ink3 }}>Total</div>
        <div style={{ fontSize: 27, fontWeight: 800, lineHeight: "30px" }}>{total}</div>
      </div>
    </div>
  );
}

function arcPath(cx, cy, r, a1, a2) {
  const p = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
  const [x1, y1] = p(a1), [x2, y2] = p(a2);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

function MiniCard({ icon, title, body }) {
  return (
    <div style={{ background: ME.card, borderRadius: ME.radius, boxShadow: ME.shadow, padding: 14, minHeight: 120 }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: "#F2F2F2", color: ME.ink2,
        display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={18} /></span>
      <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 10, lineHeight: "19px" }}>{title}</div>
      {body}
    </div>
  );
}

/* ── Armoires ──────────────────────────────────────────────────────────── */
/* Teintes échantillonnées au pixel sur `assets/screens/myeddy/armoires-liste.png` :
   fond très pâle, glyphe pastel de la même famille — le glyphe n'est pas une version
   foncée du fond, il reste clair. */
const ARMOIRES = [
  { nom: "Comptabilité", meta: "5 classeurs · 248 documents", teinte: "#F4F8E8", encre: "#B7D067" },
  { nom: "Juridique", meta: "86 documents", teinte: "#ECE9FF", encre: "#7C6CFF" },
  { nom: "Achats", meta: "86 documents", teinte: "#FEE8E6", encre: "#F66359" },
  { nom: "Ressources Humaines", meta: "5 classeurs · 248 documents", teinte: "#E7F7FF", encre: "#5BC8FF" },
  { nom: "Direction", meta: "248 documents", teinte: "#FFF6E4", encre: "#FFC24B" },
  { nom: "Commercial", meta: "2 classeurs · 40 documents", teinte: "#EAF9F2", encre: "#6ED2A6" },
  { nom: "Marketing", meta: "12 documents", teinte: "#FAECF9", encre: "#DE7CD7" },
];

function ArmoiresScreen({ onOpen }) {
  const [vue, setVue] = React.useState("list");
  return (
    <>
      <AppHeader title="Armoires" />
      <Scroll>
        <SearchBar placeholder="Rechercher une armoire…" view={vue} onView={setVue} />
        {vue === "list"
          ? ARMOIRES.map(a => (
              <div key={a.nom} style={{ background: ME.card, borderRadius: ME.radius, boxShadow: ME.shadow }}>
                <Row last onClick={onOpen} title={a.nom} subtitle={a.meta}
                  leading={<TileIcon teinte={a.teinte} encre={a.encre} />} />
              </div>
            ))
          : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {ARMOIRES.map(a => (
                <button key={a.nom} type="button" onClick={onOpen} style={{ background: ME.card, borderRadius: ME.radius,
                  boxShadow: ME.shadow, border: "none", cursor: "pointer", padding: 14, textAlign: "left", fontFamily: ME.font }}>
                  <TileIcon teinte={a.teinte} encre={a.encre} />
                  <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 10, color: ME.ink }}>{a.nom}</div>
                  <div style={{ fontSize: 12.5, color: ME.ink2, marginTop: 3 }}>{a.meta}</div>
                </button>
              ))}
            </div>
          )}
      </Scroll>
    </>
  );
}

function TileIcon({ teinte, encre }) {
  return (
    <span style={{ width: 44, height: 44, flex: "none", borderRadius: 12, background: teinte, color: encre,
      display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="archive" size={21} /></span>
  );
}

/* ── Documents d'un classeur ───────────────────────────────────────────── */
const DOCUMENTS = [
  { nom: "Facture_Acme_0425.pdf", statuts: ["Validé"] },
  { nom: "Contrat_Bail.pdf", statuts: ["En attente de validation", "Signé"] },
  { nom: "Bulletin_Avril.pdf", statuts: ["Commenté", "Envoyé en signature", "Signé", "Exporté"] },
  { nom: "Devis_Globex_112.pdf", statuts: ["Envoyé en signature", "Signé"] },
  { nom: "Note_Interne_03.pdf", statuts: ["Commenté"] },
];

function DocumentsScreen({ onBack, onOpen }) {
  const [astuce, setAstuce] = React.useState(true);
  return (
    <>
      <AppHeader title="Armoires" />
      <Scroll>
        <SearchBar placeholder="Rechercher un document…" />
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14, color: ME.ink2, padding: "2px 0" }}>
          <button type="button" onClick={onBack} aria-label="Retour" style={{ border: "none", background: "transparent",
            color: ME.ink, cursor: "pointer", padding: 0, display: "flex" }}><Icon name="arrow-left" size={19} /></button>
          <span>Armoires</span><Icon name="chevron-right" size={15} />
          <span>Comptabilité</span><Icon name="chevron-right" size={15} />
          <span style={{ color: ME.ink, fontWeight: 700 }}>Factures 2025</span>
        </div>
        {astuce && <Astuce onClose={() => setAstuce(false)}>maintenez un document appuyé pour activer la sélection multiple.</Astuce>}
        {DOCUMENTS.map(d => (
          <button key={d.nom} type="button" onClick={onOpen} style={{ background: ME.card, borderRadius: ME.radius,
            boxShadow: ME.shadow, border: "none", cursor: "pointer", padding: 14, textAlign: "left", fontFamily: ME.font }}>
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <DocThumb />
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: ME.ink }}>{d.nom}</span>
              <span style={{ color: ME.ink3 }}><Icon name="chevron-right" size={20} /></span>
            </span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {d.statuts.map(s => <StatusChip key={s} label={s} />)}
            </span>
          </button>
        ))}
      </Scroll>
    </>
  );
}

Object.assign(window, { SplashScreen, LoginScreen, DashboardScreen, ArmoiresScreen, DocumentsScreen, Rings, JAUGE });
