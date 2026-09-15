const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Icon = (props) => React.createElement(__ns().Icon, props);

const OFFRE = [
  {name: "livret-accueil", label: "Guide de l'entreprise"},
  {name: "conge", label: "Congés"},
  {name: "notes-de-frais", label: "Note de frais", open: true},
  {name: "carte-visite", label: "Carte de visite"},
  {name: "questionnaire", label: "Sondages & Question…"},
  {name: "emargement", label: "Emargement", disabled: true},
  {name: "annuaire", label: "Annuaire"},
  {name: null, label: "Covoit"}
];

const OFFRE_PLUS = [
  {name: "sales-up", label: "Sales Up", tone: "black"},
  {name: "bon-inter", label: "Bon d'intervention", tone: "black", disabled: true}
];

function SectionLabel({children}) {
  return (
    <span style={{alignSelf: "flex-start", background: "#3E3E3E", color: "var(--white)", borderRadius: 10,
      padding: "10px 16px", fontSize: 15, fontFamily: "var(--font-core)"}}>{children}</span>
  );
}

function AppCard({app, onOpen}) {
  return (
    <button onClick={() => app.open && onOpen && onOpen()} disabled={app.disabled}
      style={{appearance: "none", border: 0, cursor: app.disabled ? "default" : "pointer", textAlign: "left",
        background: "var(--grey-50)", borderRadius: 12, padding: 10, display: "flex", flexDirection: "column", gap: 12,
        opacity: app.disabled ? 0.45 : 1, overflow: "hidden"}}>
      {app.name
        ? <img src={"../../assets/app-icons/" + (app.tone || "red") + "/" + app.name + ".svg"} alt="" style={{width: 42, height: 42, display: "block"}} />
        : <span style={{width: 42, height: 42, borderRadius: 9, background: "var(--grey-100)", display: "block"}} />}
      <span style={{fontSize: 14, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{app.label}</span>
    </button>
  );
}

function LauncherScreen({onOpen}) {
  return (
    <div style={{position: "relative", minHeight: "100%", background: "var(--white)", overflow: "hidden"}}>
      <img src="../../assets/brand-chevron.svg" alt="" style={{position: "absolute", right: -62, top: 62, width: 122, opacity: 0.4, transform: "rotate(180deg)", pointerEvents: "none"}} />
      <img src="../../assets/brand-chevron.svg" alt="" style={{position: "absolute", right: -70, top: 560, width: 120, opacity: 0.35, transform: "rotate(180deg)", pointerEvents: "none"}} />
      <img src="../../assets/brand-chevron.svg" alt="" style={{position: "absolute", left: -74, bottom: 30, width: 140, opacity: 0.4, transform: "rotate(180deg)", pointerEvents: "none"}} />
      <div style={{position: "relative", padding: "12px 16px 20px", display: "flex", flexDirection: "column", gap: 18}}>
        <div style={{display: "flex", alignItems: "flex-start", gap: 16, minHeight: 56}}>
          <button aria-label="Menu" style={{appearance: "none", border: 0, background: "none", cursor: "pointer", padding: "8px 0", color: "#2B2B45"}}>
            <svg width="30" height="22" viewBox="0 0 30 22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M2 3h26M2 11h26M2 19h26"/></svg>
          </button>
          <span style={{position: "relative", margin: "0 auto"}}>
            <img src="../../assets/logo-dailyapps-by-xefi-dark.svg" alt="DAILYAPPS by XEFI" style={{height: 46, display: "block"}} />
            <span style={{position: "absolute", top: -8, right: 18, width: 22, height: 22, borderRadius: "var(--radius-pill)",
              background: "var(--primary)", color: "var(--white)", fontSize: 12, fontWeight: "var(--fw-extrabold)",
              display: "flex", alignItems: "center", justifyContent: "center"}}>1</span>
          </span>
        </div>

        <div>
          <div style={{fontSize: 26, color: "var(--grey-400)", lineHeight: "34px"}}>Bienvenue sur DailyApps,</div>
          <div style={{fontSize: 30, fontWeight: "var(--fw-extrabold)", color: "var(--grey-800)", lineHeight: "38px"}}>Titouan</div>
        </div>

        <SectionLabel>Offre DailyApps</SectionLabel>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
          {OFFRE.map((a) => <AppCard key={a.label} app={a} onOpen={onOpen} />)}
        </div>

        <SectionLabel>Offre Dailyapps Plus</SectionLabel>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
          {OFFRE_PLUS.map((a) => <AppCard key={a.label} app={a} />)}
        </div>

        <div style={{display: "flex", alignItems: "center", marginTop: 4}}>
          <span style={{flex: 1, height: 48, marginRight: -24, border: "1px solid var(--link)", borderRadius: "var(--radius-pill)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "var(--link)", fontSize: 16, fontWeight: "var(--fw-extrabold)"}}>
            Partager l'offre DailyApps</span>
          <span style={{width: 56, height: 56, borderRadius: "var(--radius-pill)", background: "var(--link)", color: "var(--white)",
            display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
            <Icon name="phone-call" size={24} /></span>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, {LauncherScreen});
