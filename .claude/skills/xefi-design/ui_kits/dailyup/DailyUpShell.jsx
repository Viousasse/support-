/* DailyUp UI Kit — application shell: brand sidebar + top bar.
   Consumes design-system primitives from the bundle namespace. */
const { Icon, IconButton, Avatar, SearchField, Badge } = window.DuKit;

const NAV = [
  { id: "dashboard", label: "Tableau de bord", icon: "AbTesting" },
  { id: "reports", label: "Rapports", icon: "FileSign" },
  { id: "meetings", label: "Réunions", icon: "StickerTextOutline" },
  { id: "clients", label: "Clients", icon: "AccountOutline" },
  { id: "billing", label: "Facturation", icon: "CashCheck" },
  { id: "settings", label: "Paramètres", icon: "CogOutline" },
];

const XefiMark = ({ width = 96, invert = false }) => (
  <img src="../../assets/logo/xefi-sans-baseline-rouge-noir.svg" alt="XEFI"
    style={{ width, height: "auto", display: "block", filter: invert ? "invert(1)" : "none" }} />
);

function Sidebar({ active, onNavigate }) {
  return (
    <aside style={{
      width: 248, flexShrink: 0, height: "100%", boxSizing: "border-box",
      background: "var(--color-background-surface)", borderRight: "1px solid var(--color-border-subtle)",
      display: "flex", flexDirection: "column", padding: "20px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 24px" }}>
        <XefiMark width={72} />
        <span style={{ width: 1, height: 22, background: "var(--color-border-default)" }} />
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--color-text-primary)" }}>DailyUp</span>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((n) => {
          const on = n.id === active;
          return (
            <button key={n.id} onClick={() => onNavigate(n.id)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", border: "none",
              borderRadius: "var(--radius-md-px)", cursor: "pointer", textAlign: "left",
              background: on ? "var(--color-action-primary-default)" : "transparent",
              color: on ? "var(--color-text-on-action)" : "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: on ? 600 : 500,
              transition: "background var(--motion-fast) var(--ease-standard)",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--color-action-secondary-hover)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              <Icon name={n.icon} size={20} />
              <span style={{ flex: 1 }}>{n.label}</span>
              {n.id === "reports" && <Badge tone="brand">8</Badge>}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: "var(--radius-md-px)", background: "var(--color-background-surface-sunken)" }}>
        <Avatar initials="LV" size="sm" />
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Lorick Vacher</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--color-text-secondary)" }}>XEFI LONS</span>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title, onSearch, onNewToast }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 20, padding: "16px 28px",
      borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-background-surface)",
    }}>
      <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</h1>
      <div style={{ flex: 1, maxWidth: 360, marginLeft: "auto" }}>
        <SearchField size="sm" placeholder="Rechercher un rapport, un client…" onChange={(e) => onSearch && onSearch(e.target.value)} />
      </div>
      <Tooltip content="Notifications" direction="bottom">
        <IconButton variant="ghost" aria-label="Notifications" icon={<Icon name="NotificationsStyleOutlined" size={22} />} onClick={onNewToast} />
      </Tooltip>
      <Avatar initials="LV" size="md" />
    </header>
  );
}
const { Tooltip } = window.DuKit;

Object.assign(window, { Sidebar, Topbar, XefiMark, NAV });
