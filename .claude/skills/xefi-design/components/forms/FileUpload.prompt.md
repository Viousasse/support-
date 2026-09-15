Zone de dépôt de fichier — glisser-déposer ou clic, avec une ligne d'aide précisant les formats acceptés.

```jsx
<FileUpload accept="image/*,.pdf" multiple
  hint="JPG, PNG ou PDF · 10 Mo maximum" onFiles={handleFiles} />
```

`hint` doit toujours nommer les formats et la taille limite : c'est là que l'utilisateur découvre la contrainte, pas dans le message d'erreur.