Composite labeled field — the DailyUp "placeholder/layout" pattern: a title with optional required asterisk, a sunken bordered control (leading icon + input + inline black action button + dropdown), and helper/subtitle text.

```jsx
<FormField label="Titre de la synthèse" required
  leadingIcon={<Icon name="StickerTextOutline" size={20} />}
  actionLabel="Button" dropdown helperText="Subtitle du placeholder" />

<FormField label="Email" required error helperText="Adresse invalide" defaultValue="bob@" />
<FormField label="Commentaire" multiline placeholder="Votre message…" />
```

States: default, focus (red ring), error (red border + helper), disabled. `multiline` gives a textarea.
