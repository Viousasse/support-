Notification transitoire avec titre et ton — apparaît, informe, disparaît seule.

```jsx
<Toast tone="success" title="Note transmise"
  description="Votre note a été transmise au manager." onClose={fermer} />
```

Réservé au retour d'une action que l'utilisateur vient de déclencher. Une information qui doit rester à l'écran est un `Banner`, pas un toast. Ne jamais y mettre une action indispensable : le toast s'efface.