# DailyUp UI Kit

Interactive recreation of the **DailyUp** workspace — XEFI's meeting → report (synthèse) → validation → production → facturation pipeline tool. French-language product.

## Files
- `index.html` — the interactive shell. Open it to navigate: the **Rapports** list → click a row → **report detail** (agenda *Sujets*, stakeholders, comment thread, history timeline). Search filters the list; the bell fires a comment toast; deleting opens a confirm modal.
- `AppShell.jsx` — `Sidebar` (brand logo + nav + user) and `Topbar` (title + search + notifications + avatar).
- `ReportsScreen.jsx` — filter chips + reports table with workflow status badges and stacked avatars.
- `ReportDetail.jsx` — agenda topics, comments, stakeholders, and the four-stage `HistoryTimeline` (Création · Validation · Production · Facturation).

## Notes
Les écrans lisent leurs primitives depuis `window.DuKit`, défini par `DuPrimitives.jsx`.
`Icon`, `Avatar`, `Toast`, `Modal` et `ListItem` y viennent du système unifié
(`window.XEFIDesignSystem_6d8aa5`). `Button`, `IconButton`, `Badge`, `Chip`, `Card`,
`Tooltip`, `EmptyState` et `SearchField` sont les variantes propres à DailyUp, conservées
locales au kit : le système unifié ne publie qu'un composant par famille, aligné sur
DailyApps et la charte. Voir readme.md, « Arbitrages de la fusion ». Screen files are kit-local (not bundled components) and attach themselves to `window`.

Workflow status → Badge tone: Création→neutral, Validation→warning, Production→info, Facturation→yes(success).
