Tableau composable à filets — pour des données dont les cellules contiennent des composants (badges, avatars, actions).

```jsx
<Table columns={[{key:"titre", header:"Rapport"},
  {key:"statut", header:"Statut", render: r => <Badge status={r.statut} />}]}
  rows={rows} rowKey="id" onRowClick={ouvrir} />
```

`render` prend le rôle du contenu de cellule. `dense` resserre les lignes.

`DataGrid` est l'équivalent DailyApps : en-têtes en capitales, survol de ligne en rouge pâle, hauteur de ligne fixe à 48. Choisissez selon le produit.