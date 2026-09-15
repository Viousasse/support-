# UI kit — Notes de frais (web)

Recomposition d'un écran de gestion de notes de frais à partir des seuls éléments présents
dans les planches source (`uploads/Couverture.pdf`) : fond `#F5F5F6`, conteneur 1200 px,
modules blancs rayon 16 avec ombre diffuse, datagrid à en-tête Inter, volet latéral droit,
modale de confirmation, états vides.

**Source.** L'écran « Note en cours » et la colonne de navigation reproduisent les maquettes
fournies par l'équipe (`uploads/DESKTOP - ENVOI COMPTABILITE.svg`, `uploads/Frame 290829.svg`).
L'écran « Mon équipe » (file de validation) n'existait pas dans les maquettes : il est composé
avec les mêmes primitives et reste à valider.

## Écrans
- `AppShell.jsx` — colonne de navigation sombre + barre supérieure.
- `NoteList.jsx` — carte « Vos notes » : bascule Note de Frais / CB Pro, notes par période.
- `NoteDetail.jsx` — détail de la note : entête, formulaire, répartition, tableau des dépenses.
- `ExpenseBreakdown.jsx` — panneau « Répartitions des dépenses » et pastilles de type.
- `ValidationScreen.jsx` — file de validation manager (composition, hors maquette).

Ouvrir `index.html` pour la version cliquable.
