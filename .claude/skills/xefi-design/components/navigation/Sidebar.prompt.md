Colonne de navigation d'une application DailyApps : fond `#212121`, largeur fixe 250 px, une seule action rouge en tête, motif de marque rouge en filigrane au pied.

```jsx
<Sidebar basePath="../../assets" active="en-cours" onNavigate={setScreen}
  ctaIcon={<Icon name="plus" size={16} />}
  items={[{id:"en-cours",label:"Note en cours",icon:<Icon name="file-pen" size={20} />}]} />
```

L'élément actif prend un fond `grey-800` arrondi 8 et un texte blanc ; les autres sont en `grey-500`.
