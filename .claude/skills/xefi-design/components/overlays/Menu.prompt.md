Menu d'actions déroulant — la liste des actions possibles sur un objet, ouverte depuis un bouton ou un bouton-icône.

```jsx
<Menu align="right" trigger={<IconButton label="Options" icon={<Icon name="MoreVertStyleRound" size={20} />} />}
  items={[{label:"Modifier", onClick:editer},
          {divider:true},
          {label:"Supprimer", tone:"danger", onClick:supprimer}]} />
```

`defaultOpen` monte le panneau déjà ouvert : réservé aux planches et aux vignettes, jamais en production.

`tone="danger"` pour l'action destructive, toujours en dernier et séparée par un `divider`. Un menu ne contient que des actions, jamais de la navigation.