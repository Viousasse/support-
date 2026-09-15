Liste de documents ou de dépenses. Seul composant qui utilise Inter (en-têtes).

```jsx
<DataGrid columns={[{key:"date",header:"DATE"},{key:"libelle",header:"LIBELLÉ"},{key:"montant",header:"MONTANT",align:"right"}]} rows={rows} />
```

`renderCell` sert à poser un `<Badge>` dans la colonne statut.
