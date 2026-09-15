# UI kit — Application mobile DailyApps

Le **splash** et le **lanceur d'applications** reproduisent les maquettes fournies par l'équipe
(`uploads/iPhone 13 & 14 - 1.svg` pour le splash, capture d'écran du lanceur en production).
Gabarit 390 × 844, marges 16 px, safe area haute 44 px, indicateur bas 79 px.

L'écran « Notes de frais » mobile reste une composition avec les primitives du système : aucune
maquette mobile de cet écran n'a été fournie.

Une réserve : l'icône **Covoit** n'existe pas dans les SVG fournis (emplacement laissé gris),
et le filigrane clair du pictogramme au coin bas-droit de chaque carte n'est pas reproduit —
il demanderait les glyphes seuls, hors tuile. Les chevrons rouges des bords sont extraits du
SVG de splash (`assets/brand-chevron.svg`).

## Écrans
- `SplashScreen.jsx` — écran de lancement, fond noir, logo centré (source directe).
- `LauncherScreen.jsx` — grille des applications de la suite.
- `MobileExpenses.jsx` — liste de dépenses et formulaire de saisie.
- `PhoneFrame.jsx` — gabarit 390 × 844 avec safe areas du kit.
