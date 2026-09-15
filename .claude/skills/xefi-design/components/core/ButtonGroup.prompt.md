Contrôle segmenté à choix unique — un seul segment actif à la fois, pour basculer entre deux ou trois vues d'un même contenu.

```jsx
<ButtonGroup items={[{id:"notes", label:"Note de Frais (4)"}, {id:"cb", label:"CB Pro (4)"}]}
  value={vue} onChange={setVue} size="md" />
```

Conteneur blanc bordé en rayon 12, segment actif en aplat rouge détaché en rayon 9, segments inactifs en texte gris sur fond transparent. Hauteurs de segment : `s` 30 / `md` 36 / `l` 40.

À ne pas confondre avec des `Chip` de filtre, qui se cumulent : un groupe segmenté dit qu'un seul choix est actif à la fois. Au-delà de quatre segments, passez aux `Tabs`.
