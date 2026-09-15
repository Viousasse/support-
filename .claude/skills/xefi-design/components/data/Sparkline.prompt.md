Courbe de tendance sans axes — pour montrer une évolution à côté d'un chiffre, jamais pour lire une valeur.

```jsx
<Sparkline data={[820, 940, 760, 1180, 1020, 1248]} height={90} />
```

Si le lecteur doit lire des valeurs, il faut un vrai graphique avec des axes. `fill` remplit sous la courbe, `dot` marque le dernier point.