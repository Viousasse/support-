const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Sidebar = (props) => React.createElement(__ns().Sidebar, props);
const TopBar = (props) => React.createElement(__ns().TopBar, props);
const Icon = (props) => React.createElement(__ns().Icon, props);
const IconButton = (props) => React.createElement(__ns().IconButton, props);

const NAV = [
  {id: "en-cours", label: "Note en cours", icon: <Icon name="file-pen-line" size={20} />},
  {id: "transmises", label: "Notes transmises", icon: <Icon name="History" size={20} />},
  {id: "equipe", label: "Mon équipe", icon: <Icon name="users" size={20} />},
  {id: "comptabilite", label: "Envoi en comptabilité", icon: <Icon name="send" size={20} />},
  {id: "statistique", label: "Statistique", icon: <Icon name="chart-no-axes-column-increasing" size={20} />},
  {id: "regles", label: "Règles de dépenses", icon: <Icon name="shield" size={20} />},
  {id: "parametrages", label: "Paramétrages", icon: <Icon name="CogOutline" size={20} />},
  {id: "mobile", label: "Application mobile", icon: <Icon name="smartphone" size={20} />}
];

function AppShell({children, active, onNavigate, onCreate, title}) {
  return (
    <div style={{display: "flex", height: "100vh", overflow: "hidden", background: "var(--background)"}}>
      <Sidebar items={NAV} active={active} onNavigate={onNavigate} onCta={onCreate}
        ctaIcon={<Icon name="Plus" size={16} />} basePath="../../assets" />
      <div style={{flex: 1, display: "flex", flexDirection: "column", minWidth: 0}}>
        <TopBar title={title} basePath="../../assets"
          actions={<IconButton icon={<Icon name="NotificationsStyleOutlined" size={18} />} label="Notifications" size={36} variant="ghost" />}
          user={<button className="da-topbar__user"><Icon name="AccountOutline" size={20} />Antoine Fontaine<Icon name="ChevronDown" size={16} /></button>} />
        <div style={{flex: 1, overflow: "auto", padding: 24}}>{children}</div>
      </div>
    </div>
  );
}
Object.assign(window, {AppShell});
