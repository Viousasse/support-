Curseur de valeur continue — pour un réglage dont l'ordre de grandeur compte plus que la valeur exacte.

```jsx
<Slider value={seuil} min={0} max={100} step={5} showValue onChange={setSeuil} />
```

Si la valeur exacte compte — un montant, un nombre de jours — utilisez `Input` ou `Counter`. Bornez `min`/`max` seulement quand la borne est réelle.