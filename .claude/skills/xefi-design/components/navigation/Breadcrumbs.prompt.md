Fil d'Ariane — situe l'écran courant dans la hiérarchie, quand la profondeur dépasse deux niveaux.

```jsx
<Breadcrumbs items={[{label:"Notes de frais", href:"#notes"},
  {label:"Juin 2026", href:"#juin"}, {label:"Déjeuner client — Lyon"}]} />
```

Le dernier élément est l'écran courant : pas de lien dessus. Inutile à deux niveaux — le titre de page suffit.