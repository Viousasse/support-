Saisie libre d'étiquettes — l'utilisateur crée ses propres valeurs, contrairement à `Combobox` qui puise dans une liste fermée.

```jsx
<TagInput label="Étiquettes" value={tags} onChange={setTags}
  placeholder="Ajouter une étiquette…" />
```

Entrée ou virgule ajoute l'étiquette saisie ; Retour arrière sur un champ vide retire la dernière. Le placeholder ne s'affiche que lorsque le champ est vide. `max` plafonne le nombre d'étiquettes.