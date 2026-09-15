Icône d'interface : filaire, trait fin, couleur héritée du texte voisin — le seul composant d'iconographie du système.

```jsx
<Icon name="ChevronDown" size={20} />      {/* pictogramme XEFI, sources Figma */}
<Icon name="file-pen-line" size={20} />    {/* glyphe fonctionnel, substitution Lucide */}
```

Tailles de la charte : S 16 / M 20 / L 24. Dans un bouton, l'icône se place à droite du libellé (convention du kit DailyApps).

Deux jeux, un seul composant, aucun appel réseau :
- **PascalCase** → les 84 pictogrammes XEFI de `assets/icons/icon-data.js`. Préférez-les toujours quand le glyphe existe.
- **kebab-case** → les 23 glyphes fonctionnels de `assets/icons/icon-data-ui.js` (Lucide, substitution assumée), pour ce que le jeu XEFI ne couvre pas : `file-pen-line`, `calendar-days`, `users`, `folder`, `shield`, `shield-check`, `download`, `receipt`, `receipt-euro`, `camera`, `calendar`, `square-pen`, `send`, `send-horizontal`, `filter-x`, `chart-pie`, `chart-no-axes-column-increasing`, `phone-call`, `smartphone`, `chevron-left`, `chevron-right`, `triangle-alert`, `rotate-ccw`.

Un nom inconnu ne rend rien et **émet un avertissement en console** — vérifiez-la si une icône manque. `strokeWidth` n'agit que sur le jeu fonctionnel, dessiné au trait.
