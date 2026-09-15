Boîte de dialogue centrée sur voile — pour une action courte et bloquante : confirmer, choisir, saisir deux champs.

```jsx
<Modal open={ouvert} title="Supprimer ce rapport ?" onClose={fermer}
  footer={<><Button variant="neutral">Annuler</Button><Button variant="primary">Supprimer</Button></>}>
  Cette action est définitive.
</Modal>
```

Une modale est un contexte autonome : elle porte son propre bouton principal. Jamais de modale dans une modale. Si la tâche dépasse deux champs, c'est une page ou un drawer. `Dialog` est l'équivalent DailyApps.