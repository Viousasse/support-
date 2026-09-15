# MyEddy — kit UI mobile

Reconstruction de l'application mobile **MyEddy**, la gestion documentaire XEFI :
armoires, classeurs, documents, validation et signature.

## Écrans

| Fichier | Contenu |
| --- | --- |
| `MyEddyShell.jsx` | Coquille et primitives locales — cadre de téléphone, barre d'état, en-tête de page, barre d'onglets flottante, pastilles de statut, bandeau d'astuce, feuille modale, boutons |
| `MyEddyScreens.jsx` | Lancement, connexion, tableau de bord à jauges, armoires (liste et grille), documents d'un classeur |
| `MyEddyDetail.jsx` | Détail d'un document (panneaux de saisie superposés à la page du document), mes tâches, profil, corbeille, et le motif d'état vide `EmptyState` |
| `MyEddyApp.jsx` | Enchaînement des écrans et feuille d'ajout |

## Parcours

Le lancement bascule seul vers la connexion après 1,8 s. Renseignez identifiant et mot de
passe pour entrer — le bouton reste inactif tant que les deux champs sont vides, et un
message d'erreur s'affiche si vous forcez. Ensuite : quatre onglets, une armoire ouvre ses
documents, un document son détail, le bouton rouge ouvre la feuille d'ajout.

## Ce que le kit tient de la source

- **Thème clair**, contrairement à ce que laissaient croire les trois premières captures :
  seuls le lancement et la connexion sont sombres. Fond `#F5F5F6`, surfaces blanches.
- **Rayons de 12-14** sur les cartes et les contrôles, 16 sur les panneaux de détail —
  MyEddy a son propre pas, distinct des 8/16 du socle XEFI.
- **Six statuts documentaires** relevés, en pastilles pastel à point coloré : Validé, En
  attente de validation, Signé, Commenté, Envoyé en signature, Exporté. Un document en
  porte plusieurs à la fois. « Refusé » existe dans le produit — l'action Refuser est
  maquettée — mais **aucune des 118 captures ne montre sa pastille** : sa couleur n'est
  pas publiée, et un libellé inconnu retombe sur un gris neutre en avertissant en console.
- **Tuiles d'icône pastel** par armoire, une famille de couleur par domaine. Le glyphe
  n'est pas une version foncée du fond : il reste clair.
- **Le détail d'un document est une superposition modale au-dessus de la page.** Ce n'est
  pas une pile de cartes sur fond gris : la facture occupe le fond de l'écran, **voilée**,
  et les panneaux de saisie flottent au-dessus en blanc pur — on garde le document sous
  les yeux en renseignant ses métadonnées. C'est le voile qui détache les panneaux : les
  interstices rendent `#F2F2F3`–`#F5F5F6`, jamais du blanc. Dans l'en-tête, titre
  (`#C2C2C3`), sous-titre (`#DBDBDC`) et bouton Retour (`#C3C3C4`) sont atténués eux
  aussi ; seule la **croix de fermeture** reste à pleine force, comme affordance de sortie.
  Le kit ne comporte donc **pas** de panneau « Aperçu » : la source n'en a pas.
- **Barre d'onglets flottante** en verre dépoli, avec bouton d'action rouge détaché.
- **Anneaux concentriques rouges** en fond des écrans sombres.
- **Jauge semi-circulaire** à quatre segments pour les widgets du tableau de bord :
  `#14B8A6` · `#FEB31C` · `#F97316` · `#FF3B53`. Le teal du premier segment est
  **exactement** l'encre de la pastille « Envoyé en signature » : MyEddy réutilise sa
  palette d'un composant à l'autre.
- **Fonds sombres neutres** (`#2D2D2D` → `#161616` → `#000000`), sans teinte bleue.

## ⚠ Constat d'accessibilité sur le produit source

Les couleurs des pastilles de statut et des tuiles d'armoire sont **échantillonnées au
pixel** sur les captures et reproduites telles quelles. Or **aucune des six paires
relevées n'atteint le seuil RGAA de 4,5:1** pour du texte de 12,5 px :

| Statut | Fond | Encre | Contraste |
| --- | --- | --- | --- |
| Validé | `#DEF3E8` | `#1FAE66` | 2,48:1 |
| En attente de validation | `#FBEFDC` | `#E59314` | 2,17:1 |
| Envoyé en signature | `#DCF5F2` | `#14B8A6` | 2,18:1 |
| Commenté | `#EEE7FE` | `#8B5CF6` | 3,53:1 |
| Exporté | `#E8EAEE` | `#64748B` | 3,95:1 |
| Signé | `#E0E9FB` | `#2D6BE5` | 3,96:1 |

Les neutres de texte ne passent pas non plus : sous-titres et placeholders `#8D8D8D` sur
blanc donnent **3,23:1**, les chevrons `#9B9B9B` **2,75:1**. Comme pour les pastilles, ce
sont les valeurs réelles du produit, reproduites sans correction.

Ces valeurs ne sont **pas** corrigées dans le kit. Un design system qui publie des hexes
que le produit n'utilise pas fait porter aux consommateurs une couleur inventée : le kit
reproduit, il ne redresse pas. **À remonter à l'équipe MyEddy** — assombrir chaque encre
d'environ 25 % suffirait à passer le seuil sans changer la lecture des pastilles.

Le septième statut, **Refusé**, n'a pas pu être mesuré : sa pastille n'apparaît dans
aucune capture. Rien n'est publié pour lui. Si vous disposez d'un écran qui l'affiche,
fournissez-le et il rejoindra la table.

Un seul écart assumé : le **rouge**. La source donne `#E11D2A` sur l'avatar et `#E1121C`
sur le bouton Valider ; le kit tient le rouge extincteur de la charte, `#E10600`. L'écart
est imperceptible et la charte fait autorité.

## Notes

Les primitives sont **locales au kit** : MyEddy a un langage visuel distinct de DailyApps
et DailyUp, et le système unifié ne publie qu'un composant par famille. Seul `Icon` vient
du système (`window.XEFIDesignSystem_6d8aa5`).

⚠ **Reconstruction depuis des exports PNG.** Le fichier Figma
« My-Eddy-Ancien-Design » n'était pas accessible et aucun export vectoriel n'a été fourni :
118 captures ont servi de référence. Les **espacements et les tailles sont relevés à
l'œil** et restent approximatifs. À reprendre si le Figma devient accessible.

**Les couleurs, elles, sont échantillonnées au pixel** — pastilles de statut, tuiles
d'armoire, segments de jauge, neutres de texte, fonds sombres, rouges d'erreur.

**Règle de tenue du kit : ne posez jamais une couleur à l'œil**, les captures sont dans
`assets/screens/myeddy/` et se chargent en canvas. Et échantillonnez selon la nature de la
zone : une **surface** se relit à la couleur modale, un **texte** au **pixel le plus
sombre** de son tracé. Prendre la modale sur du texte de 13 px ne rend que le halo
d'antialiasing — l'erreur a déjà été commise ici, et donnait des gris 1,6 fois trop
clairs.

Neutres de texte relevés : titres `#2F2F2F` · sous-titres, placeholders et fil d'Ariane
inactif `#8D8D8D` · chevrons `#9B9B9B` · onglet inactif de la barre basse `#C4C4C4`.

Écrans inventoriés dans la source mais non reconstruits : onboarding (5 écrans), mot de
passe oublié, création d'armoire et de classeur, déplacement de document, tampons, partage,
filtres, suivi de dossier, paramètres de notification. Dites-le si l'un d'eux doit
rejoindre le kit.

**L'onglet Corbeille n'a aucune maquette source** — les 118 captures ne comportent pas de
dossier Corbeille. Son écran extrapole le motif d'état vide relevé sur
`classeurs-vide.png` : cartes fantômes en squelette délavé derrière le message, titre gras
sur deux lignes sans icône, sous-titre orienté action, actions empilées dont une seule
rouge pleine. Le composant `EmptyState` porte ce motif et se réutilise. **Aucune règle
produit n'y est affirmée** : ni délai de rétention, ni comportement de suppression — rien
de tel n'apparaît dans les captures.
