Carte d'indicateur — un chiffre, son libellé et sa variation, pour un en-tête de tableau de bord.

```jsx
<StatCard label="Dépenses du mois" value="12 480,00 €"
  delta="+8,2 %" trend="up" tone="brand" />
```

`trend` porte la direction, `delta` le texte : la flèche et le signe doivent concorder. Tons `neutral` / `brand` / `info` / `success` — pas de ton pour dire « mauvais », c'est le contexte qui l'indique.