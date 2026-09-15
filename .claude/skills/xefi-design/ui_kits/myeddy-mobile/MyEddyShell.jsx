/* Kit UI MyEddy — coquille mobile et primitives propres au produit.

   MyEddy a son propre langage visuel, distinct de DailyApps et DailyUp : rayons de 12-14,
   pastilles de statut pastel à point coloré, tuiles d'icône teintées, barre d'onglets
   flottante avec bouton d'action rouge. Ces primitives lui sont donc locales, comme
   DuPrimitives l'est au kit DailyUp — le système ne publie qu'un composant par famille.
   Seul `Icon` vient du système unifié.

   ⚠ Reconstruction à partir des exports PNG du fichier Figma « My-Eddy-Ancien-Design ».
   Aucune source vectorielle ni variable n'était disponible : les valeurs numériques sont
   relevées à l'œil sur les captures, pas reprises du fichier. À reprendre si le Figma
   devient accessible. */

const { Icon } = window.XEFIDesignSystem_6d8aa5;

const ME = {
  bg: "#F5F5F6", card: "#FFFFFF", ink: "#2F2F2F", ink2: "#8D8D8D", ink3: "#9B9B9B", tabIdle: "#C4C4C4",
  line: "#E7E7EA", red: "#E10600", radius: 14, radiusSm: 10,
  shadow: "0 1px 3px rgba(0,0,0,0.06)",
  font: '"Lato", system-ui, -apple-system, "Segoe UI", sans-serif',
};

/* Statuts documentaires — couleurs échantillonnées au pixel sur
   `assets/screens/myeddy/documents-liste.png`. Ces six paires sont les valeurs réelles
   du produit ; aucune n'est estimée.

   « Refusé » est un statut réel de MyEddy (l'action Refuser existe, voir
   `taches-refuser.png`) mais **aucune des 118 captures ne montre sa pastille** : sa
   couleur n'est donc pas publiée. Un libellé inconnu retombe sur un gris neutre et
   avertit en console, plutôt que d'emprunter une teinte inventée.

   ⚠ AUCUNE de ces six paires n'atteint le seuil RGAA de 4,5:1 pour du texte de 12,5 px —
   mesuré : Validé 2,48 · En attente 2,17 · Signé 3,96 · Commenté 3,53 · Envoyé en
   signature 2,18 · Exporté 3,95. C'est un constat sur MyEddy, pas sur ce kit : les
   valeurs sont reproduites telles quelles parce qu'un design system qui publie des hexes
   que le produit n'utilise pas fait porter aux consommateurs une couleur inventée.
   À remonter à l'équipe MyEddy ; voir README.md. */
const STATUTS = {
  "Validé":                   { bg: "#DEF3E8", fg: "#1FAE66" },
  "En attente de validation": { bg: "#FBEFDC", fg: "#E59314" },
  "Signé":                    { bg: "#E0E9FB", fg: "#2D6BE5" },
  "Commenté":                 { bg: "#EEE7FE", fg: "#8B5CF6" },
  "Envoyé en signature":      { bg: "#DCF5F2", fg: "#14B8A6" },
  "Exporté":                  { bg: "#E8EAEE", fg: "#64748B" },
};
const STATUT_INCONNU = { bg: "#EFEFF1", fg: "#5B5B62" };

function StatusChip({ label }) {
  const connu = STATUTS[label];
  if (!connu && typeof console !== "undefined") {
    console.warn('[MyEddy] statut "' + label + '" — aucune couleur relevée dans les captures source, rendu en gris neutre.');
  }
  const s = connu || STATUT_INCONNU;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 10px",
      background: s.bg, color: s.fg, borderRadius: 999, fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.fg, flex: "none" }} />
      {label}
    </span>
  );
}

function PhoneFrame({ children, dark = false }) {
  return (
    <div style={{ width: 360, height: 800, borderRadius: 30, overflow: "hidden", position: "relative",
      background: dark ? "#000000" : ME.bg, fontFamily: ME.font, color: ME.ink,
      boxShadow: "0 12px 48px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column" }}>
      <StatusBar dark={dark} />
      {children}
    </div>
  );
}

function StatusBar({ dark }) {
  const c = dark ? "#FFFFFF" : ME.ink;
  return (
    <div style={{ height: 44, flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", fontSize: 15, fontWeight: 600, color: c }}>
      <span>9:41</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ width: 5, height: 5, borderRadius: 999, background: c, opacity: 0.35 }} />
        <span style={{ width: 5, height: 5, borderRadius: 999, background: c, opacity: 0.35 }} />
        <span style={{ width: 5, height: 5, borderRadius: 999, background: c }} />
        <span style={{ width: 22, height: 11, border: "1.4px solid " + c, borderRadius: 3, marginLeft: 4, opacity: 0.9 }} />
      </span>
    </div>
  );
}

/* En-tête de page : titre, actions rondes, avatar */
function AppHeader({ title, eyebrow, onMenu }) {
  return (
    <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: 10, flex: "none" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {eyebrow && <div style={{ fontSize: 15, color: ME.ink2, lineHeight: "20px" }}>{eyebrow}</div>}
        <div style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: "34px" }}>{title}</div>
      </div>
      <HeaderButton onClick={onMenu}><Icon name="ellipsis" size={20} /></HeaderButton>
      <HeaderButton badge><Icon name="bell" size={19} /></HeaderButton>
      <span style={{ width: 44, height: 44, borderRadius: 14, background: ME.red, color: "#fff", flex: "none",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700 }}>M</span>
    </div>
  );
}

function HeaderButton({ children, badge, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ position: "relative", width: 44, height: 44, flex: "none",
      borderRadius: 13, background: ME.card, border: "1px solid " + ME.line, color: ME.ink,
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      {children}
      {badge && <span style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: 999,
        background: ME.red, border: "1.5px solid " + ME.card }} />}
    </button>
  );
}

/* Barre d'onglets flottante + bouton d'action */
const TABS = [
  { id: "accueil", label: "Accueil", icon: "house" },
  { id: "armoires", label: "Armoires", icon: "archive" },
  { id: "taches", label: "Tâches", icon: "list-checks" },
  { id: "corbeille", label: "Corbeille", icon: "TrashCanOutline" },
];

function TabBar({ active, onNavigate, onAdd }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, pointerEvents: "none",
      display: "flex", alignItems: "center", padding: "0 14px 18px", gap: 12 }}>
      <div style={{ flex: 1, height: 62, borderRadius: 22, background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
        display: "flex", alignItems: "center", pointerEvents: "auto" }}>
        {TABS.map(t => {
          const on = t.id === active;
          return (
            <button key={t.id} type="button" onClick={() => onNavigate(t.id)} style={{ flex: 1, height: "100%",
              border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 3, color: on ? ME.red : ME.tabIdle }}>
              <Icon name={t.icon} size={21} />
              <span style={{ fontSize: 11, fontWeight: on ? 700 : 500 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
      <button type="button" onClick={onAdd} aria-label="Ajouter" style={{ width: 56, height: 56, flex: "none",
        borderRadius: 999, background: ME.red, color: "#fff", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "auto",
        boxShadow: "0 6px 18px rgba(225,6,0,0.35)" }}>
        <Icon name="Plus" size={26} />
      </button>
    </div>
  );
}

/* Bandeau d'astuce — présent en tête de la plupart des listes */
function Astuce({ children, onClose }) {
  return (
    <div style={{ background: ME.card, borderRadius: ME.radius, boxShadow: ME.shadow, padding: "12px 12px 12px 14px",
      display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ color: "#3B5BFF", flex: "none", marginTop: 1 }}><Icon name="lightbulb" size={18} /></span>
      <div style={{ flex: 1, fontSize: 13, lineHeight: "18px", color: ME.ink2 }}>
        <strong style={{ color: "#3B5BFF" }}>Astuce :</strong> {children}
      </div>
      <button type="button" onClick={onClose} aria-label="Fermer" style={{ width: 26, height: 26, flex: "none",
        border: "1px solid " + ME.line, borderRadius: 8, background: ME.card, color: ME.ink2, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={14} /></button>
    </div>
  );
}

function SearchBar({ placeholder, view, onView }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ flex: 1, minWidth: 0, height: 48, background: ME.card, borderRadius: 12, boxShadow: ME.shadow,
        display: "flex", alignItems: "center", gap: 10, padding: "0 12px", color: ME.ink2 }}>
        <Icon name="SearchStyleRound" size={19} />
        <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{placeholder}</span>
        <span style={{ color: ME.ink2 }}><Icon name="sliders-horizontal" size={18} /></span>
      </div>
      {onView && (
        <div style={{ display: "flex", gap: 3, padding: 3, background: "#E7E7EA", borderRadius: 12, flex: "none" }}>
          {[["grid", "layout-grid"], ["list", "list"]].map(([id, ic]) => (
            <button key={id} type="button" onClick={() => onView(id)} aria-pressed={view === id}
              style={{ width: 40, height: 40, border: "none", cursor: "pointer", borderRadius: 9,
                background: view === id ? ME.card : "transparent", color: view === id ? ME.ink : ME.ink2,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: view === id ? "0 1px 2px rgba(0,0,0,0.10)" : "none" }}>
              <Icon name={ic} size={19} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Feuille modale basse */
function Sheet({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.30)",
      display: "flex", alignItems: "flex-end", zIndex: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", background: ME.card,
        borderRadius: "22px 22px 0 0", padding: "10px 16px 26px" }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: "#D8D8DC", margin: "0 auto 14px" }} />
        <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 14 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Row({ leading, title, subtitle, trailing, onClick, last }) {
  return (
    <button type="button" onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12,
      padding: "14px 14px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left",
      borderBottom: last ? "none" : "1px solid " + ME.line }}>
      {leading}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: ME.ink }}>{title}</span>
        {subtitle && <span style={{ display: "block", fontSize: 13, color: ME.ink2, marginTop: 2 }}>{subtitle}</span>}
      </span>
      {trailing || <span style={{ color: ME.ink3, flex: "none" }}><Icon name="chevron-right" size={20} /></span>}
    </button>
  );
}

function PrimaryButton({ children, onClick, icon }) {
  return (
    <button type="button" onClick={onClick} style={{ width: "100%", height: 52, borderRadius: 12, border: "none",
      background: ME.red, color: "#fff", fontFamily: ME.font, fontSize: 16, fontWeight: 700, cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {icon && <Icon name={icon} size={19} />}{children}
    </button>
  );
}

function GhostButton({ children, onClick, icon }) {
  return (
    <button type="button" onClick={onClick} style={{ width: "100%", height: 52, borderRadius: 12,
      border: "1px solid " + ME.line, background: ME.card, color: ME.ink, fontFamily: ME.font, fontSize: 16,
      fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {icon && <Icon name={icon} size={18} />}{children}
    </button>
  );
}

/* Vignette de document — aperçu papier schématique, comme sur les maquettes */
function DocThumb({ size = 44 }) {
  return (
    <span style={{ width: size, height: size * 1.16, flex: "none", borderRadius: 4, background: "#fff",
      border: "1px solid " + ME.line, padding: 4, display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
      {[0.9, 0.5, 0.75, 0.4, 0.85, 0.6].map((w, i) => (
        <span key={i} style={{ height: 2, width: (w * 100) + "%", background: "#D8D8DC", borderRadius: 1 }} />
      ))}
    </span>
  );
}

/* Conteneur de défilement — UNIQUE point de défilement du kit. Tout écran qui défile
   passe par lui : écrire un `overflowY: auto` à la main fait réapparaître la barre de
   défilement système, absente des captures source, et décale le contenu de 15 px.
   `fill` pour un parent non-flex (hauteur 100 % au lieu de flex:1). */
function Scroll({ children, pad = 16, padTop = 0, padBottom = 118, gap = 12, fill = false }) {
  return (
    <div style={{ ...(fill ? { height: "100%" } : { flex: 1, minHeight: 0 }), overflowY: "auto",
      boxSizing: "border-box", padding: `${padTop}px ${pad}px ${padBottom}px`, scrollbarWidth: "none",
      // `relative` place le scroller dans la couche positionnée : sans lui, un calque de
      // fond en `absolute` (écran Détail) peindrait par-dessus le contenu en flux.
      position: "relative",
      display: "flex", flexDirection: "column", gap }}>{children}</div>
  );
}

Object.assign(window, { ME, STATUTS, STATUT_INCONNU, StatusChip, PhoneFrame, StatusBar, AppHeader, HeaderButton,
  TabBar, TABS, Astuce, SearchBar, Sheet, Row, PrimaryButton, GhostButton, DocThumb, Scroll });
