Frise d'avancement — le seul composant de frise du système. Il couvre l'avancement d'un objet dans un flux métier **et** la progression d'un formulaire multi-écrans.

```jsx
{/* Flux métier — chaque étape porte son état */}
<Stepper steps={[{label:"Création", status:"done", meta:"02 fév"},
  {label:"Validation", status:"current"}, {label:"Production", status:"pending"}]} />

{/* Formulaire multi-écrans — l'index désigne l'étape active */}
<Stepper current={1} onStepClick={setStep}
  steps={[{label:"Détails", sub:"Client & site"}, "Sujets", "Validation"]} />
```

Deux façons de décrire l'état, au choix : `status` par étape, ou `current` en index à partir de zéro — les étapes précédentes deviennent faites, les suivantes en attente. `onStepClick` n'autorise le retour que sur les étapes déjà franchies.

C'est le composant du pipeline DailyUp — Création → Validation → Production → Facturation. `orientation="vertical"` dans un volet latéral étroit.

Un composant `Steps` distinct existait pour les formulaires multi-écrans : il faisait double emploi et a été fusionné ici. Ses appels restent valides — `steps` accepte les libellés en chaîne, et `sub` est un alias de `meta`.
