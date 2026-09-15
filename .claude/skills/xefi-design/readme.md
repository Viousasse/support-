# XEFI — Design System

Système de design unifié de **XEFI**, éditeur de logiciels et prestataire de services
informatiques. Il fusionne en un seul système les deux systèmes produit existants —
**DailyApps** (suite d'applications métier : notes de frais, congés, annuaire, documents,
badge, partenaires, objectifs, validation, maintenance, assistance) et **DailyUp** (SaaS
interne de conduite de réunions, transformant une réunion en synthèse puis en rapport
suivant le pipeline Création → Validation → Production → Facturation).

L'autorité visuelle est la **charte graphique XEFI 2025**. Les deux produits en sont des
déclinaisons : un rouge extincteur, du noir, du blanc, un gris neutre, et rien d'autre.
Toute l'interface est en **français**.

## Sources

| Source | Nature | Ce qui en a été tiré |
| --- | --- | --- |
| `uploads/FR - CHARTE GRAPHIQUE XEFI - CORRIGEE.pdf` | Charte graphique XEFI 2025, 17 pages, équipe communication | Couleurs de marque et leurs références print, gris neutre, typographies de référence, règles de logotype (zone de protection, taille minimale, interdits), doctrine de pictogrammes |
| `DailyApps Design System/` (dossier fourni) | Système de design DailyApps, lui-même dérivé de `Couverture.pdf` (planche Design System, export Figma 2460 × 13975) et `Icons.pdf` (planche Logos Daily Apps) | Rampes de couleur, échelle typographique, ombres, rayons, grille, inventaire de composants, icônes d'application, vignettes de fichier, logos, kits UI web et mobile |
| `DailyUp Design System/` (dossier fourni) | Système de design DailyUp, dérivé de « DAILYUP - Design system.fig » (pages `Design-System-V2` et `Page-1`) | Palette Material re-brandée, couche sémantique de 337 tokens couleur, thème sombre, 40 familles de composants supplémentaires, jeu d'icônes de 84 glyphes, logotype XEFI vectoriel, kit UI workspace |

Aucun dépôt Git, aucune URL de production, aucun lien Figma vivant n'a été fourni : les
deux systèmes sources ont été transmis sous forme de dossiers, et la charte sous forme de
PDF. Les valeurs numériques de ce système sont reprises telles quelles de ces sources —
aucune n'a été arrondie ni recalée sur une grille théorique.

---

## CONTENT FUNDAMENTALS

**Langue.** Français, sans exception. Accents et espaces typographiques respectés
(« Gérez vos notes de frais », « Élévation & ombres »). Format monétaire `1 250,00 €` —
virgule décimale, espace insécable avant l'euro. Dates `12/06/2026`, ou `12 fév` en forme
courte. Tailles `500 Mo`.

**Voix.** Vouvoiement, jamais de tutoiement. L'interface parle des objets de
l'utilisateur : « Gérez vos notes de frais », « Votre note a été transmise », « Créez
votre première note ». Le produit ne dit jamais « je », et ne dit pas « nous » : les
messages système restent impersonnels (« Cette action est définitive »). Sur DailyUp,
outil de travail plus dense, l'adresse s'efface encore davantage au profit de libellés
nominaux ou impératifs — « Valider », « Modifier », « Nouveau rapport ».

**Ton.** Sobre, professionnel, administratif. Aucune exclamation, aucun superlatif, aucune
formule marketing. Les confirmations tiennent en une phrase courte et factuelle :
*Note de frais validée* / *Votre note a été transmise.* Les erreurs nomment le problème et
disent quoi faire, sans excuse ni explication technique : *Montant invalide*.

**Casing.** Capitalisation de phrase partout — titres (« Titre du module »), boutons
(« Valider », « Créer une note », « Supprimer »). **Deux exceptions** : les en-têtes de
datagrid sont en capitales (`DATE`, `LIBELLÉ`, `MONTANT`, `STATUT`), et les surtitres de
section le sont aussi, très espacés (`ESPACEMENTS`, `RAYONS`, `ROUGE — PRIMAIRE`).

**Libellés.** Un mot par action, le même dans tout le produit. Verbe à l'infinitif pour
les actions (Valider, Annuler, Supprimer, Exporter), nom pour les objets (Mes dépenses,
Montant TTC, Carte affaires). Un bouton nomme son action — jamais « OK » ni « Confirmer »
seul. Les placeholders sont des instructions : « Saisissez un montant »,
« Sélectionnez… », « Rechercher… », avec de vrais points de suspension `…`.

**Vocabulaire de statut.** Fermé, et différent par produit.
DailyApps, au féminin (accord avec « note ») : Validée, Soumise, Corrigée, Refusée,
Brouillon, En paie. DailyUp, étapes du pipeline : Création, Validation, Production,
Facturation. Ne pas inventer d'autre statut.

**Questions.** Les confirmations destructives sont des questions courtes suivies d'une
conséquence : « Supprimer cette dépense ? » / « Cette action est définitive. »

**Exemples de microcopie relevés dans les sources.** « Nouveau commentaire. »,
« En attente que les lignes soient produites. », « Cette ligne peut être facturée. »,
« Déjeuner client — Lyon », « Photographier le justificatif ».

**Emoji : jamais.** Aucun emoji dans aucune des sources produit. Aucun caractère Unicode
décoratif non plus, sauf `…`, `—` (tiret cadratin dans les libellés) et `€`.

---

## VISUAL FOUNDATIONS

**Couleur.** La charte borne volontairement l'univers chromatique à une couleur
identitaire : le **rouge extincteur `#E10600`** (CMJN 0/88/100/0 · RVB 225/6/0 · Pantone
2347c · RAL 3020), complété du **noir `#000000`** (Pantone P Process Black C), du **blanc
`#FFFFFF`** et d'un **gris neutre** obtenu en déclinant le noir : 90 % `#191919`, 70 %
`#4C4C4C`, 50 % `#7F7F7F`, 30 % `#B2B2B2`, 20 % `#CCCCCC`, 10 % `#E5E5E5`. Pour les
encadrés, la charte autorise des aplats de couleur identitaire à différents niveaux de
transparence.

Sur cette base, le système d'interface ajoute ce que la charte ne couvre pas : une rampe
rouge complète `red-50 → red-900` construite depuis la primaire (`red-500` **est**
`#E10600`, les teintes claires sont des mélanges au blanc, les foncées des
assombrissements), une rampe de gris d'interface `grey-50 → grey-900`, et des accents
fonctionnels par paires 50/100 (fond pâle + couleur pleine) réservés aux statuts et aux
notifications. **Le rouge est la couleur d'action primaire**, et aussi la couleur du
destructif. Le bleu `#1473E6` est réservé aux liens **et au focus des champs** — jamais au
rouge. Le fond de page est `#F5F5F6`, les surfaces sont blanches, le texte est gris
(`grey-900` titres, `grey-800` corps, `grey-500` secondaire, `grey-400` placeholder).
**Pas un seul dégradé, nulle part.**

**Typographie.** La charte fixe **Montserrat** et **Segoe UI** pour l'édition, la
communication, la signalétique et le web ; **Helvetica** pour le print ; **Arial** pour la
bureautique. Le socle expose ces familles (`--font-display`, `--font-ui`, `--font-print`,
`--font-office`), et conserve les familles d'interface de chaque produit pour la fidélité
des kits : **Lato** partout dans DailyApps, **Inter** pour ses seuls en-têtes de datagrid,
**Noto Sans** et **Roboto** dans DailyUp.

L'échelle de titres du socle est courte : **H1 32 / H2 24 / H3 20 / H4 16**. Le corps est
à **14 px** par défaut, **12 px** en secondaire ou accompagné d'une icône S. Sur
DailyApps, tout le fonctionnel — corps, boutons, champs, onglets, cellules — tient en
14 px Regular : c'est le poids, pas la taille, qui hiérarchise.

**Espacement.** Grille de **4 px**, avec deux exceptions et deux seulement : la
typographie et les hauteurs de composants interactifs. Échelle nommée `xs 4 · sm 8 ·
md 12 · lg 16 · xl 24 · 2xl 32 · 3xl 48`, où **`md` (12) est réservé au padding interne**
et le **plancher de padding interne est 8 px**. La **marge de page est de 40 px**, hors
échelle. Le rythme exprime la parenté : plus deux éléments sont proches, plus ils sont
liés. Écran de référence 1920 × 1080, conteneur centré 1200 px. Mobile : marges latérales
16 px, safe area haute 44 px, indicateur bas 79 px.

**Hauteurs de composants.** Quatre valeurs, choisies par conteneur et non par hiérarchie :
**XS 30 · S 36 · M 40 · L 48**. Le pleine largeur s'applique par défaut en bas d'un drawer
ou d'une modale mobile, et nulle part ailleurs. 8 px entre deux boutons groupés.

**Rayons.** Deux valeurs, plus la pilule : **8 px** pour tout ce qui se saisit ou se
clique (champs, boutons, notifications, options de menu), **16 px** pour les contenants
(cartes, modules, modales), **999** pour badges, chips, avatars et interrupteurs. Les
cases à cocher font exception, à 4 px.

**Cartes.** Surface blanche, rayon 16 px, ombre douce sans décalage, **pas de bordure** :
rien n'est bordé et ombré à la fois — les cartes portent l'ombre, les champs la bordure.
Les cartes issues de DailyUp s'appuient en plus sur un filet 1 px `border-subtle`, la
structure y reposant davantage sur le trait que sur l'ombre.

**Ombres.** Quatre ombres, toutes **sans décalage vertical sauf une** : module
`0 0 30 noir 10 %`, module léger `0 0 8 gris 5 %`, modale `0 0 20 noir 10 %`, volet
latéral droit `0 4 20 noir 15 %`. La profondeur vient du flou, pas de la direction.
**Aucune ombre interne.** Une rampe neutre `elevation-1 → 4` plus un niveau overlay
accompagne les composants venus de DailyUp.

**Bordures.** 1 px. `grey-100` au repos, `grey-300` au survol, `#1473E6` au focus,
`#E10600` en erreur. Les séparateurs de datagrid sont en `grey-50`.

**Fonds et imagerie.** Pas de texture, pas de motif répété, **aucun dégradé**. Dans
l'interface produit, aucune photo ni illustration : le seul fond « imagé » est la marque
elle-même — le motif triangulaire du logo en filigrane translucide dans les tuiles
d'application et en bas de la colonne de navigation ; le splash screen mobile est un aplat
noir avec le logo centré. Sur les supports de communication, en revanche, la
photographie existe, et toujours sous une seule forme : **détourée dans le chevron** (voir
ICONOGRAPHY). Jamais de photo en pleine page, jamais de photo rectangulaire libre. Les
sources ne fournissent pas de bibliothèque photo, donc aucune convention de température ni
de grain n'est documentée ici.

**Transparence et flou.** Réservés au voile des modales (noir ~35 %, `rgba(4,4,4,0.46)`
côté DailyUp). **Aucun `backdrop-filter`**, aucune capsule translucide, aucun dégradé de
protection. Les aplats transparents de couleur identitaire autorisés par la charte
concernent les encadrés de supports de communication, pas l'interface.

**Survol.** Rouge plein → rouge plus foncé (`red-700`). Contour rouge → fond `red-50`.
Neutre → fond `grey-50`. Ligne de datagrid → fond `red-50`, pas de gris. Option de menu →
`grey-50`, et `red-50` si elle est active. **Jamais d'opacité, jamais d'agrandissement.**

**Appui et désactivation.** Pas d'effet d'échelle, pas de rebond : l'appui assombrit d'un
cran. Un contrôle désactivé passe en fond `grey-50` et texte `grey-300`, sans bordure.

**Focus.** Visible sur tout élément interactif, sans exception : contour 2 px `#1473E6`
avec 2 px de décalage. C'est une exigence d'accessibilité, jamais négociable.

**Contraste.** Tout texte normal tient **4,5:1** minimum sur son fond. Dix couleurs de
texte héritées des sources échouaient à ce seuil et ont été assombries à teinte constante :
les six statuts DailyApps (les valeurs d'origine tombaient entre 1,91:1 et 4,50:1) et les
quatre tons de feedback DailyUp (entre 2,15:1 et 4,36:1). Les fonds, bordures, pastilles et
aplats gardent les valeurs source — seules les couleurs de **texte** ont changé, via les
tokens `--*-text` de `tokens/colors.css` et les surcharges de `tokens/unify.css`. Le statut
n'est jamais porté par la couleur seule : le libellé le nomme toujours.

**Animation.** Discrète et fonctionnelle : 100–300 ms, `cubic-bezier(0.4, 0, 0.2, 1)`. On
anime les couleurs, le curseur d'interrupteur, la rotation du chevron, de petits
déplacements et des fondus. **Rien ne rebondit, rien ne défile en parallaxe.** La charte
autorise l'animation des pictogrammes sur les supports digitaux.

**Thème sombre.** Complet, et construit sur le **gris neutre de la charte** — des
déclinaisons de noir pur, sans teinte, les seules cohérentes avec une identité noir + rouge
(les gris de la palette DailyUp, bleutés, ne servent pas ici). Le fond de page est le
**noir pur** `#000000`, valeur de la charte et fond du splash screen ; `noir 90` `#191919`
devient la surface dominante ; `noir 80` `#333333` est ajouté pour les surfaces
surélevées, par la règle de construction de la charte elle-même. Filets en `noir 70`,
bordures en `noir 50`, texte en blanc / `noir 10` / `noir 30`.

Deux arbitrages contre la charte, imposés par le contraste. Le **rouge de marque ne tient
pas comme couleur de texte** sur fond sombre — 3,54:1 sur la surface — donc le texte et
les icônes rouges passent à `red-300` (5,74:1) ; **en aplat il reste le rouge de la
charte**, le bouton primaire est inchangé (blanc dessus, 4,97:1). Le **bleu de lien tombe à
4,22:1** et passe au cyan de la palette. Les six statuts et les quatre tons de feedback ont
tous leur pendant sombre, chacun au-dessus de 4,6:1.

Les ombres disparaissent sur fond sombre : la structure passe aux **filets** (`box-shadow`
de 1 px). Le logo bascule automatiquement sur sa variante fond sombre — aucun logo n'est
recolorisé. Le thème clair reste le défaut ; on active le sombre par
`data-theme="dark"` ou la classe `.dark` sur `:root`.

**Un composant qui ne bascule pas est un composant qui lit un token brut.** Les rôles
sémantiques (`--surface-card`, `--border-grid`, `--text-body`) basculent ; les valeurs
brutes (`--white`, `--grey-50`) non. C'est la règle à tenir en écrivant un composant.

**Disposition.** Une page = un empilement de modules blancs sur fond gris, dans le
conteneur 1200. Barre supérieure blanche fixe. Le volet latéral droit est le seul élément
flottant fixe, et il porte la seule ombre décalée du système. Le choix du conteneur suit
un arbre simple : retour transitoire → toast ; action courte et bloquante → modale ;
complément contextuel → panneau latéral ou drawer ; sinon → page. Une modale ne s'imbrique
jamais dans une modale.

---

## ICONOGRAPHY

**Doctrine de la charte.** Les pictogrammes sont **filaires, épurés, élégants, aux lignes
fines**. Ils utilisent le **noir 100 %** avec des **éléments discrets de rouge 100 %**.
Sur le digital, ils peuvent être animés.

**Jeu d'icônes livré.** 84 glyphes vectoriels sont livrés dans
`assets/icons/icon-data.js`, extraits des sources Figma DailyUp : `AbTesting`,
`AccountOutline`, `ArrowTopRight`, `CashCheck`, `Check`, `CheckCircle` (5 styles),
`ChevronDown`, `ChevronUp`, `Close` (5 styles), `CogOutline`, `CommentAlert`,
`DeleteForever` (5 styles), `ErrorOutline` (5 styles), `ExpandMore` (5 styles),
`FileSign`, `History`, `Info` (5 styles), `Link` (5 styles), `MenuDown`, `MenuUp`,
`Minus`, `MoreVert` (5 styles), `Notifications` (5 styles), `Plus`, `Search` (5 styles)
et suivants. Ils s'appellent en **PascalCase** via le composant `Icon`, sont peints en
`currentColor` et suivent le grille 24 px de Material Symbols / MDI, trait ~2 px, variantes
Outlined et Round préférées.

**Substitution assumée pour le reste.** Le jeu maison DailyApps est posé dans son PDF
source avec une police d'icônes qui n'y est pas embarquée : il s'exporte en carrés vides et
n'a pas pu être récupéré. Les **47 glyphes d'interface fonctionnels** qui manquent au jeu de 84
sont donc empruntés à **Lucide** (0.544.0, licence ISC, trait 2 px, bouts arrondis) et
**vendorisés** dans `assets/icons/icon-data-ui.js` : `file-pen-line`, `calendar-days`,
`users`, `folder`, `shield`, `shield-check`, `download`, `receipt`, `receipt-euro`,
`camera`, `calendar`, `square-pen`, `send`, `send-horizontal`, `filter-x`, `chart-pie`,
`chart-no-axes-column-increasing`, `phone-call`, `smartphone`, `chevron-left`,
`chevron-right`, `triangle-alert`, `rotate-ccw`, plus le lot ajouté pour le kit MyEddy
(`house`, `archive`, `list`, `layout-grid`, `list-checks`, `lightbulb`, `printer`,
`fingerprint`, `bot`, `scan`, `sliders-horizontal`, `circle-question-mark`, `file-text`,
`scale`, `power`, `eye-off`, `image`, `scroll-text`, `log-out`, `bell`, `ellipsis`,
`arrow-left`, `x`, `check`). Ils s'appellent en **kebab-case** par le
même composant `Icon`. Ce choix est cohérent avec la doctrine de la charte — filaire,
lignes fines, jamais de remplissage — mais **reste une substitution, à remplacer dès que
le jeu XEFI complet est fourni** (SVG ou police).

**Aucune icône ne dépend du réseau.** Les deux jeux sont livrés dans le dépôt et rendus en
`<svg>` inline — 84 pictogrammes XEFI et 47 glyphes fonctionnels. Une première version servait les glyphes fonctionnels depuis un CDN via
masque CSS : à éviter — un `mask-image` sur URL distante ne peint pas dans tous les
environnements, et les icônes s'affichaient en carrés pleins. **Ne pas réintroduire de
dépendance CDN pour l'iconographie.** Préférez toujours un nom PascalCase quand le glyphe
XEFI existe : `Plus` plutôt que `plus`, `ChevronDown` plutôt que `chevron-down`,
`NotificationsStyleOutlined` plutôt que `bell`, `AccountOutline` plutôt que
`circle-user-round`, `CogOutline` plutôt que `settings`, `Check`, `History`,
`TrashCanOutline`, `SearchStyleRound`, `WarningStyleOutlined`.

**Style d'usage.** Trait uniquement, jamais de remplissage, couleur héritée du texte
voisin. Tailles **S 16 · M 20 · L 24**, et la taille de l'icône commande la taille du
texte : une icône S nue accompagne du texte 12 px, une icône M du texte 14 px. Une icône
placée **avant** le texte utilise un gap fixe de 4 ou 8 px ; une icône placée **après** le
texte est justifiée au bord du composant, sans gap fixe. Dans les boutons DailyApps,
l'icône se place **à droite** du libellé — c'est la convention du kit source.

**Icônes d'application (fournies, non redessinées).** 10 applications livrées en SVG par
l'équipe, rangées dans `assets/app-icons/{red,black}/` : `annuaire`, `bon-inter`,
`carte-visite`, `conge`, `emargement`, `livret-accueil`, `notes-de-frais`,
`questionnaire`, `sales-up`, `vendeur` — plus `dailyapps` (la marque seule), en rouge
uniquement. Tuile pleine à coins très arrondis, pictogramme blanc au trait épais, motif
triangulaire de la marque en filigrane dégradé. Elles **ne se recolorisent pas** : rouge ou
noir, rien d'autre.

**Icônes d'application par offre (fournies, non redessinées).** Les tuiles des trois offres
commerciales sont dans `assets/app-icons/offres/`, une par offre :

- `dailyapps/` — 16 applications : `annuaire`, `budget-achat`, `carte-de-visite`,
  `checklist-entree-sortie`, `conge`, `covoiturage`, `demandes-rh`, `deplacement`,
  `emargement`, `fournitures`, `livret-accueil`, `logiciels`, `materiel-it`,
  `notes-de-frais`, `questionnaire`, `vehicule`.
- `productivity/` — `bon-intervention`, `vendeur`, plus leurs variantes fond sombre
  (`bon-intervention-sombre`, `sales-up-sombre`) et **Sales Up en vectoriel**
  (`sales-up-noir.svg`, `sales-up-rouge.svg`).
- `complementaire/` — deux marques distinctes. **Omnysis** : logotype `omnysis-noir-rouge`
  et `omnysis-blanc-rouge`, monogramme « O » en noir, rouge et blanc. **Sherlox** :
  logotype `sherlox-noir` et `sherlox-blanc`, et la loupe seule
  (`sherlox-loupe-rouge`, `sherlox-loupe-blanc`) — le S en forme de loupe est la
  signature de la marque et s'utilise indépendamment du logotype.

Toutes les tuiles DailyApps et Productivity partagent le même gabarit : fond rouge
extincteur, coins très arrondis, pictogramme blanc au trait, chevron de marque en
filigrane. Les variantes « sombre » inversent le fond en noir pour les interfaces en thème
sombre et les supports à fond noir. Elles ne se recolorisent pas.

**MyEddy (fourni, non redessiné).** Logotype de l'application MyEddy dans
`assets/logo/myeddy/` : `myeddy-noir.svg` pour fond clair, `myeddy-blanc.svg` pour fond
sombre. Un robot filaire au trait fin surmonte le mot « Eddy », dont le **E** est un aplat
rouge extincteur et les lettres « ddy » une manuscrite. Le E rouge et le cœur du robot
**ne changent pas de couleur** d'une version à l'autre : seuls le trait du robot et les
lettres manuscrites s'inversent. Trois captures de référence de l'application mobile
(lancement, connexion, tableau de bord) sont dans `assets/screens/myeddy/` — fournies par
l'équipe, non reconstruites. Un kit UI mobile est disponible dans
`ui_kits/myeddy-mobile/` : ses couleurs sont échantillonnées au pixel sur les captures,
ses espacements restés approximatifs. **Son README porte un constat d'accessibilité sur le
produit source** : aucune des six pastilles de statut relevées n'atteint 4,5:1 — de 2,17 à
3,96. Les valeurs réelles sont reproduites sans correction, et l'écart est à remonter à
l'équipe MyEddy plutôt qu'à masquer dans le kit. Un septième statut, « Refusé », existe
dans le produit mais n'apparaît sur aucune capture : sa couleur n'est pas publiée.

**Vignettes de fichier (récupérées).** 20 extensions dans `assets/file-icons/` : doc, csv,
pdf, jpg, txt, eps, rar, html, xls, png, zip, wav, psd, php, mp3, ppt, avi, mov, dll, msg.
Feuille blanche à coin plié, contenu gris schématique, étiquette de couleur portant
l'extension en capitales.

**Logos (fournis, jamais redessinés).** Le logotype XEFI est livré en vectoriel dans
`assets/logo/` : `xefi-baseline-rouge-noir.svg` et `xefi-baseline-rouge-blanc.svg` sont les
deux verrouillages couleur de la charte ; `xefi-baseline-noir.svg` et
`assets/logo/xefi-baseline-blanc.svg` sont les variantes monochrome et négative, réservées aux cas où
la couleur est impossible. La version sans baseline est disponible en vectoriel
(`xefi-sans-baseline-rouge-noir.svg`, `-rouge-blanc.svg`) et en PNG
(`xefi-sans-baseline-rouge-noir.png`, `-rouge-blanc.png`). Les sources ne fournissaient la
version sans baseline qu'en PNG : les SVG ont été obtenus en retirant le groupe de la
baseline du fichier vectoriel avec baseline, sans retoucher un seul tracé. Les déclinaisons pays sont dans
`assets/logo/international/` : EN, CH, NL en PNG, l'espagnol existant en castillan et en
catalan dans les sources. Seule la baseline est traduite, jamais le logotype.
`assets/logo/xefi-wordmark.svg` est une silhouette monochrome d'un seul tracé, utilisée par
le kit DailyUp là où la marque doit hériter de la couleur du texte.

Les verrouillages DailyApps sont dans `assets/logo-*.svg` : motif seul, icône
d'application, « DAILYAPPS by XEFI » et « DAILYAPPS », en versions fond clair et fond
sombre, plus les tuiles de marque.

**Chevron — la signature.** Le chevron est l'élément identitaire fort de la marque. Il est
intégré au logo, et **s'utilise aussi seul**, indépendamment de lui. Cinq déclinaisons sont
livrées dans `assets/arrows/` : plein rouge, plein noir, plein blanc, contour rouge,
contour noir. Le plein est préféré au contour. Ni les proportions, ni la forme, ni la
couleur ne se modifient.

**Chevron comme masque photographique.** C'est le seul emploi d'imagerie photographique de
la marque, et il est systématique : la photo n'est jamais posée en pleine page, elle est
**détourée dans la forme du chevron** ou accolée à un chevron plein.
`assets/arrows/chevron-masque-portrait.png` montre le masque plein,
`chevron-masque-photo.png` la combinaison chevron rouge + photo écrêtée, et
`chevron-ecrete-photo.png` le chevron écrêté employé sur les supports du réseau de
franchise.

**Pictogrammes métier (fournis en vectoriel).** 23 pictogrammes officiels dans
`assets/pictograms/`, nommés par sujet : `animation`, `batiment`, `chiffre-daffaires`,
`commerce`, `comptable`, `developpement`, `formation`, `hebergement`, `logiciels`,
`maintenance`, `marketing`, `materiel`, `paie`, `point-de-vente`, `print`,
`programmation`, `rentabilite`, `reunion`, `securite`, `software`, `statistiques`,
`support`, `technique`. Dessinés sur une boîte de 81 × 82, **filaires, lignes fines, noir
100 % avec de petits accents de rouge 100 %** — exactement la doctrine de la charte. Un jeu
blanc équivalent existe en PNG dans les sources pour les fonds sombres et les aplats
rouges. Trois pictogrammes de contact (adresse, e-mail, téléphone) sont dans
`assets/pictograms/contact/`, en PNG uniquement.

Ces pictogrammes sont des **illustrations de rubrique**, pas des icônes d'interface : ils
s'emploient à 40 px et au-delà, pour signaler un domaine ou un service. Les icônes
d'interface, plus petites et fonctionnelles, restent servies par le composant `Icon`.

**Règles de logotype, non négociables (charte, p. 5–8).** Le logo est un tout : on n'en
dissocie pas les éléments, on ne remplace pas la baseline, on ne modifie ni les
proportions ni les couleurs, on ne lui ajoute pas de contour. **Le chevron rouge est
indissociable du logo** — il n'existe pas de logo XEFI sans chevron rouge, sauf décision
expresse de l'équipe communication. Le logo se pose **uniquement sur fond noir ou blanc** :
rouge et blanc sur noir, rouge et noir sur blanc. Zone de protection à respecter tout
autour ; taille minimale 40 mm de large avec baseline, 10 mm sans baseline.

**Emoji : jamais.** Aucun emoji, aucun pictogramme Unicode en guise d'icône.

---

## Substitutions à valider

Deux points sont ouverts et attendent des fichiers.

1. **Segoe UI n'est pas chargée en webfont.** La charte la désigne comme police de
   référence web au même titre que Montserrat, mais elle n'est pas librement
   distribuable. Elle est déclarée en pile système (`--font-ui`), donc réellement présente
   sur poste Windows, avec Montserrat en repli visible ailleurs. Aucune substitution
   silencieuse n'a été faite.
2. **Lato Medium (500) et ExtraBold (800) manquent.** Le kit DailyApps les demande ; la
   distribution publique de Lato ne fournit que 100/300/400/700/900. Les fichiers livrés
   dans `assets/fonts/` sont 300 / 400 / 400 italic / 700 / 900, et `--fw-extrabold`
   pointe aujourd'hui sur **700**. Si la licence XEFI couvre les fichiers complets, les
   fournir suffira : les tokens seront réalignés sans autre changement.

Résolu depuis : le **logotype couleur** et les **pictogrammes métier** ont été fournis en
vectoriel et sont intégrés. Reste la substitution partielle des **icônes d'interface**
(voir ICONOGRAPHY) : 84 glyphes réels sont livrés, les glyphes fonctionnels manquants sont
servis par Lucide.

⚠️ **Note technique sur les SVG.** Les fichiers logo fournis déclarent leurs couleurs via
des classes CSS (`.cls-1`, `.cls-2`) dans un bloc `<style>` interne — bloc que le pipeline
d'assets retire, ce qui rendait les logos entièrement noirs. Les couleurs ont été
reportées en attributs `fill` directs, conformément à ce que chaque nom de fichier
déclare. Si vous remplacez ces fichiers par de nouveaux exports, appliquer la même
conversion.

## Arbitrages de la fusion

Les deux systèmes sources divergeaient sur plusieurs points. Voici comment chacun a été
tranché, et ce que ça implique.

- **Action primaire.** DailyApps utilisait le rouge, DailyUp le noir en réservant le rouge
  à la marque et au destructif. Le système unifié suit **DailyApps et la charte : le rouge
  est l'action primaire.** Les composants venus de DailyUp lisent une couche sémantique
  `--color-*` que `tokens/unify.css` réaligne sur le rouge, sans modifier une ligne de
  leur code.
- **Un composant par famille.** Là où les deux sources définissaient la même famille
  (Button, Card, Chip, Badge, Input, Select, Checkbox, Radio, Switch, Tabs, Pagination,
  IconButton, Tooltip, EmptyState, FileIcon), **la version DailyApps est retenue** : elle
  respecte les hauteurs 30/36/40/48 et les rayons 8/16 du socle. Les variantes DailyUp
  correspondantes ne sont pas publiées.
- **Hauteurs de contrôles.** Les alias `--btn-h-*` et `--input-h-*` héritées de DailyUp
  ont été **réalignées sur l'échelle XEFI** (30 / 36 / 40 / 48) plutôt que conservées à
  leurs valeurs Material (28 / 36 / 44, 38 / 56 / 64). Les composants DailyUp encore
  publiés s'y conforment donc.
- **Icônes.** Un seul composant `Icon`, qui résout d'abord le jeu local de 84 glyphes
  (PascalCase) puis se rabat sur Lucide (kebab-case). Cela réconcilie les deux espaces de
  noms et supprime la dépendance CDN pour les glyphes réellement fournis.
- **Avatar.** Les deux sources avaient des API incompatibles (taille numérique côté
  DailyApps, taille nommée + `src` + `number` côté DailyUp). Le composant publié est un
  **surensemble** qui accepte les deux, sans casser aucun appel existant.
- **Palette DailyUp.** Les 545 tokens Figma ont été réduits à **337 entrées couleur et
  opacité**. Les primitives numériques sans unité (`--4`, `--16-2`, `--92`…) et les chaînes
  de breakpoint / motion du fichier source ont été retirées : le socle porte déjà ces
  échelles.
- **Familles Figma matérialisées.** Les 40 reproductions 1:1 du fichier Figma DailyUp
  (`BoutonPrimary`, `BadgeYes`, `HistoriqueProduction`, `FamilyIcon`…) **n'ont pas été
  reprises**. Ce sont des doublons de bas niveau des composants curés, et leurs noms
  auraient pollué l'API publique. Elles restent disponibles dans le système DailyUp
  d'origine si un besoin de restitution exacte apparaît.
- **Primitives locales du kit DailyUp.** Le kit `ui_kits/dailyup/` est une reproduction
  fidèle d'un produit existant. Comme les variantes DailyUp de Button, IconButton, Badge,
  Chip, Card, Tooltip, EmptyState et SearchField ne sont plus publiées, elles sont
  conservées **locales au kit** dans `ui_kits/dailyup/DuPrimitives.jsx`, hors namespace
  public. La restitution reste exacte, et le système ne publie toujours qu'un composant par
  famille.

- **Une seule frise.** `Steps` (formulaire multi-écrans, DailyUp/navigation) et `Stepper`
  (flux métier, DailyUp/data) dessinaient la même frise à pastilles reliées, avec des API
  incompatibles. **`Stepper` est le composant retenu** ; il absorbe les deux usages et
  accepte indifféremment un `status` par étape ou un index `current`. `Steps` est supprimé.

### Ajouts assumés

Aucun composant n'a été inventé. Quatre entrées ne correspondent pas à une famille
dessinée dans les sources, et existent parce que le système ne pouvait pas fonctionner
sans :

- **`Icon`** — enveloppe du jeu de glyphes (voir la substitution ci-dessus).
- **`Logo`, `AppIcon`, `FileIcon`** — accès typé aux assets de marque découpés dans les
  PDF sources ; aucune forme nouvelle n'a été dessinée.
- **`SidePanel`** — l'ombre « Volet latéral droit » est définie dans les planches
  DailyApps sans composant associé ; le volet lui donne un support.

---

## Index du dépôt

| Fichier / dossier | Contenu |
| --- | --- |
| `styles.css` | Point d'entrée CSS — uniquement des `@import` |
| `tokens/` | `fonts.css`, `brand.css`, `colors.css`, `dailyup-palette.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `motion.css`, `semantic.css`, `unify.css`, `theme-dark.css`, `base.css` |
| `components/` | Composants React + CSS, groupés par usage (liste ci-dessous) |
| `guidelines/` | 43 cartes de fondation — marque, logos, chevron, pictogrammes, offres, MyEddy, couleurs, typographie, espacements |
| `assets/` | Logos XEFI, DailyApps et MyEddy, chevrons et masques photo, pictogrammes métier, icônes d'application par offre, vignettes de fichier, jeu de glyphes, fontes, motifs, captures de référence |
| `ui_kits/notes-de-frais/` | Kit web DailyApps : liste des dépenses, volet de saisie, file de validation |
| `ui_kits/mobile/` | Kit mobile DailyApps : splash, lanceur d'applications, notes de frais |
| `ui_kits/dailyup/` | Kit web DailyUp : workspace des rapports, détail, commentaires, historique |
| `ui_kits/myeddy-mobile/` | Kit mobile MyEddy : lancement, connexion, tableau de bord, armoires, documents, tâches, profil |
| `templates/` | 10 dossiers prêts à copier — 7 écrans et 3 coquilles (voir ci-dessous) |
| `thumbnail.html` | Vignette du système |
| `SKILL.md` | Manifeste Agent Skill |
| `uploads/` | Sources brutes telles que fournies (charte PDF, dossiers DailyApps et DailyUp) |

**Consommer le système :** lier `styles.css` pour les tokens et les fontes, charger
`_ds_bundle.js`, puis lire les composants depuis `window.XEFIDesignSystem_6d8aa5`.

### Composants

**`components/brand/`** — `AppIcon`, `FileIcon`, `Icon`, `Logo`
(plus les constantes `APP_ICONS` et `FILE_TYPES`)

**`components/core/`** — `Avatar`, `AvatarGroup`, `AvatarInline`, `Badge`, `Button`,
`ButtonGroup`, `Card`, `Chip`, `ContextualButton`, `IconButton`, `Tooltip`

**`components/forms/`** — `Checkbox`, `Combobox`, `DatePicker`, `FileUpload`, `FormField`,
`Input`, `Radio`, `SearchInput`, `Select`, `Slider`, `Switch`, `TagInput`

**`components/data/`** — `Calendar`, `Counter`, `DataGrid`, `DescriptionList`, `Kbd`,
`NumberTag`, `Pagination`, `Rating`, `Sparkline`, `StatCard`, `Stepper`, `Table`, `Tabs`,
`Timeline`

**`components/navigation/`** — `Breadcrumbs`, `Sidebar`, `TopBar`, `Tree`

**`components/feedback/`** — `Alert`, `Banner`, `Dialog`, `EmptyState`,
`NotificationItem`, `Progress`, `SidePanel`, `Snackbar`, `SnackbarStack`, `StatusDot`,
`Toast`

**`components/overlays/`** — `Drawer`, `Menu`, `Modal`, `Popover`

**`components/surfaces/`** — `Accordion`, `Divider`, `KanbanCard`, `KanbanColumn`,
`ListItem`, `Placeholder`

Chaque composant est accompagné de son `.d.ts` (contrat de props) **et** de son
`.prompt.md` — une phrase de « quoi et quand », un exemple JSX, les variantes notables, et
le renvoi vers le composant à préférer quand deux familles se recouvrent (`Table` vs
`DataGrid`, `Modal` vs `Dialog`, `Drawer` vs `SidePanel`, `Toast` vs `Banner`,
`Combobox` vs `TagInput`). Chaque répertoire porte une carte
`@dsCard` montrant ses états et variantes.

### Templates

Dix dossiers prêts à copier, chacun avec le design system déjà câblé. Les sept premiers
sont des écrans complets, remplis de données réalistes — on efface ce qui ne sert pas. Les
trois derniers sont des coquilles vides, en Design Components directement modifiables.

**Écrans** — `templates/liste-tableau/` (recherche, filtres, datagrid, pagination) ·
`templates/detail/` (en-tête d'objet, onglets, totaux, volet latéral) ·
`templates/formulaire/` (sections, champs, options, erreur, pied d'actions) ·
`templates/tableau-de-bord/` (indicateurs, tendance, répartition, liste à traiter) ·
`templates/mobile/` (liste et saisie, safe areas iOS) · `templates/connexion/`
(aplat noir de marque, formulaire d'authentification) · `templates/etats/`
(chargement, vide, erreur, rempli — commutables par onglets)

**Coquilles** — `templates/coquille-web/` (navigation latérale, barre supérieure, zone de
contenu) · `templates/coquille-mobile/` (safe areas, en-tête, action pleine largeur) ·
`templates/page-contenu/` (vue isolée sans navigation)

Tous les écrans sont en saveur **DailyApps** — Lato, rouge en action primaire, hauteurs
30/36/40/48, rayons 8/16. Chaque dossier charge le système via son `ds-base.js` ou par
chemin relatif vers `styles.css` et `_ds_bundle.js` ; un projet consommateur n'a qu'une
ligne à ajuster.
