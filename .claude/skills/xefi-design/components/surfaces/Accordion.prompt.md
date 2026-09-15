Section dépliable — pour alléger un écran dense en repliant ce qui n'est pas consulté à chaque visite.

```jsx
<Accordion title="Historique" defaultOpen leading={<Icon name="History" size={20} />}>
  {contenu}
</Accordion>
```

Empilez plusieurs sections pour un accordéon, et passez `divider={false}` à la dernière : sinon son filet pend dans le vide. Ne repliez jamais une information nécessaire à l'action principale.