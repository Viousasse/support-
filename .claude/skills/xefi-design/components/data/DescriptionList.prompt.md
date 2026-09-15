Liste de paires terme / valeur — pour les métadonnées d'un objet dans un écran de détail.

```jsx
<DescriptionList items={[{term:"Période", value:"Juin 2026"},
  {term:"Montant TTC", value:"363,50 €"}]} />
```

`layout="rows"` aligne le terme et la valeur sur une ligne — le défaut, adapté à un volet latéral. `layout="stacked"` empile le terme au-dessus de la valeur, pour une colonne étroite.