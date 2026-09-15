Message persistant en tête de zone — une information qui reste jusqu'à ce que la cause disparaisse.

```jsx
<Banner tone="warning" title="Période close"
  actionLabel="Voir les règles" onAction={ouvrirRegles}>
  Les dépenses de mai ne sont plus modifiables.
</Banner>
```

Persistant, à la différence du `Toast` qui s'efface seul. `Alert` est l'équivalent DailyApps, plus compact, avec sa barre de ton à gauche.