Bouton d'action principal de DailyApps ; à utiliser pour toute action de formulaire, de modale ou de liste.

```jsx
<Button variant="primary" size={40} icon={<Icon name="check" />}>Valider</Button>
<Button variant="outline" size={36}>Annuler</Button>
```

Variantes : `primary` (rouge red-500 #E1121C, hover red-600 #CD1019), `outline` (contour red-500, hover fond red-50), `neutral` (contour grey-100, hover fond grey-50), `ghost` (texte red-500, hover red-700). Tailles 30 / 36 / 40 / 48 px, rayon 8. Désactivé : primary passe en fond grey-50, outline garde un contour grey-100, neutral un contour grey-50 ; texte grey-300 dans tous les cas. L'icône se place à droite du libellé.

`state="hover"` force l'état survolé — réservé aux planches de spécification.
