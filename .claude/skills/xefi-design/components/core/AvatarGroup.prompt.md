Pile d'avatars superposés avec un compteur de dépassement — pour montrer les participants d'une réunion ou les parties prenantes d'un rapport sans en lister les noms.

```jsx
<AvatarGroup people={["LV", "JB", "SR", "AL", "MD"]} max={3} size="sm" />
```

Au-delà de `max`, le reste est résumé en `+N`. `people` accepte des initiales en chaîne ou des objets `{initials, src, alt}`. Tailles nommées `xs` 24 / `sm` 32 / `md` 40 / `lg` 56 / `xl` 80 ; `sm` dans une ligne de tableau, `md` dans un en-tête.

Pour un seul collaborateur avec son nom, préférez `AvatarInline`.