Champ de sélection multiple avec recherche — l'utilisateur puise dans une liste fermée, les choix retenus s'affichent en puces retirables.

```jsx
<Combobox label="Sociétés" options={[{value:"be", label:"XEFI BORDEAUX EST"}]}
  value={vals} onChange={setVals} placeholder="Rechercher…" />
```

Liste fermée, à la différence de `TagInput` où l'utilisateur crée ses propres étiquettes. Pour un choix unique, utilisez `Select`.