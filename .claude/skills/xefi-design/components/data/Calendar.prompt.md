Grille mensuelle marquant les jours porteurs d'événements — pour une vue d'ensemble, pas pour saisir une date.

```jsx
<Calendar month={5} year={2026} selected={jour} onSelectDay={setJour}
  events={[{date: new Date(2026,5,12), tone:"warning"}]} />
```

Semaine commençant le lundi. Pour saisir une date dans un formulaire, utilisez `DatePicker`.