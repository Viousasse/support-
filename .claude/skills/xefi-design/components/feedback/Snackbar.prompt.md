Message transitoire compact en bas d'écran, avec une action facultative — pour confirmer une action et offrir de l'annuler.

```jsx
<Snackbar message="Dépense supprimée" actionLabel="Annuler"
  onAction={restaurer} onClose={fermer} />
```

`SnackbarStack` est exporté depuis le même fichier et empile plusieurs messages : `items`, `onClose(id)`, `position`.

Plus sobre que `Toast`, sans titre ni ton coloré. Un seul message à la fois dans le champ de vision.