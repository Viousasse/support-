En-tête de l'application : le logo à gauche, un filet vertical, puis le nom de l'écran courant.

```jsx
<TopBar title="Note de frais" basePath="../../assets"
  actions={<IconButton icon={<Icon name="bell" size={18} />} label="Notifications" variant="ghost" />}
  user={<span>Antoine Fontaine</span>} />
```
