Arborescence dépliable avec sélection — pour une hiérarchie de dossiers, d'entités ou de sites.

```jsx
<Tree nodes={arbre} selectedId={sel} onSelect={n => setSel(n.id)}
  defaultExpanded={["racine"]} />
```

`defaultExpanded` évite d'ouvrir sur un arbre entièrement replié. Au-delà de trois niveaux, envisagez une navigation par écrans successifs.