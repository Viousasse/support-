Colonne de tableau de flux, avec son titre, son compteur et son action d'ajout.

```jsx
<KanbanColumn title="En validation" count={4} accent="var(--yellow-100)" onAdd={creer}>
  <KanbanCard title="Analyse des risques" meta="Globex · 12 fév" />
</KanbanColumn>
```

`KanbanCard` est exporté depuis le même fichier : `title`, `meta`, `footer`, `onClick`. `accent` colore le liseré de la colonne — reprenez la couleur du statut correspondant.