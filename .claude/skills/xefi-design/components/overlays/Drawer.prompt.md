Panneau glissant sur un voile — pour un complément contextuel qu'on consulte ou édite sans quitter l'écran.

```jsx
<Drawer open={ouvert} side="right" title="Détails du rapport" onClose={fermer}
  footer={<><Button variant="neutral">Fermer</Button><Button variant="primary">Valider</Button></>}>
  {contenu}
</Drawer>
```

Un drawer est un contexte autonome : il porte son propre bouton principal. Sur mobile, les boutons de pied passent en pleine largeur. `SidePanel` est l'équivalent DailyApps, sans voile, ancré à droite.