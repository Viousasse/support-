const __ns = () => window.XEFIDesignSystem_6d8aa5 || {};
const Icon = (props) => React.createElement(__ns().Icon, props);

const TYPES = [
  {label: "Avion / Train / Taxi / Bus", short: "Avion / Train / …", color: "var(--yellow-100)", bg: "var(--yellow-50)", icon: "plane", amount: "60,00 €", part: 30},
  {label: "Carburant", color: "var(--green-100)", bg: "var(--green-50)", icon: "fuel", amount: "40,00 €", part: 20},
  {label: "Divers / Matériel", color: "var(--orange-100)", bg: "var(--orange-50)", icon: "shopping-basket", amount: "35,00 €", part: 17},
  {label: "Lavage voiture", color: "var(--cyan-100)", bg: "var(--cyan-50)", icon: "car-front", amount: "32,00 €", part: 13},
  {label: "Péage / Parking", color: "var(--blue-100)", bg: "var(--blue-50)", icon: "square-parking", amount: "30,00 €", part: 8},
  {label: "Frais kilométrique", color: "var(--grey-900)", bg: "var(--grey-50)", icon: "route", amount: "28,00 €", part: 5},
  {label: "Hôtel", color: "var(--purple-100)", bg: "var(--purple-50)", icon: "bed-double", amount: "23,00 €", part: 4},
  {label: "Restauration", color: "var(--accent-red-100)", bg: "var(--accent-red-50)", icon: "utensils-crossed", amount: "15,00 €", part: 3}
];

function TypeGlyph({type, size = 20}) {
  return (
    <span style={{width: size, height: size, borderRadius: 4, background: type.bg, color: type.color,
      display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
      <Icon name={type.icon} size={size - 8} />
    </span>
  );
}

function ExpenseBreakdown() {
  return (
    <div style={{border: "1px solid var(--grey-50)", borderRadius: "var(--radius-field)", padding: 16, flex: 1, minWidth: 420}}>
      <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "var(--text-title)"}}>
        <Icon name="chart-pie" size={18} />
        <span style={{fontSize: 14, fontWeight: "var(--fw-extrabold)"}}>Répartitions des dépenses</span>
      </div>
      <div style={{display: "flex", gap: 3, marginBottom: 16}}>
        {TYPES.map((t) => <span key={t.label} style={{flex: t.part, height: 8, borderRadius: 2, background: t.color}} />)}
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8}}>
        {TYPES.map((t) => (
          <div key={t.label} style={{border: "1px solid var(--grey-50)", borderRadius: "var(--radius-field)", padding: 8}}>
            <div style={{display: "flex", alignItems: "center", gap: 6}}>
              <TypeGlyph type={t} />
              <span style={{fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{t.short || t.label}</span>
            </div>
            <div style={{fontSize: 13, fontWeight: "var(--fw-extrabold)", color: "var(--text-title)", marginTop: 6}}>{t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, {ExpenseBreakdown, TYPES, TypeGlyph});
