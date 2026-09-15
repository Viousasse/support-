Ligne de liste ou de menu — élément avant, titre, sous-titre, élément après, état sélectionné.

```jsx
<ListItem leading={<Avatar initials="LV" size="sm" />}
  title="Lorick Vacher" subtitle="CODIR"
  trailing={<Icon name="ChevronDown" size={18} />}
  selected={sel} onClick={choisir} />
```

C'est la brique des menus, des popovers et des listes de sélection. Pour des données en colonnes alignées, utilisez `Table` ou `DataGrid`.