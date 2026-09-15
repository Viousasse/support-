Click-triggered popover panel with an arrow; closes on outside click.

```jsx
<Popover placement="bottom" trigger={<Button variant="neutral">Filtres</Button>}>
  <ListItem title="À facturer partiellement" onClick={fn} />
  <ListItem title="ORANGE" onClick={fn} />
</Popover>
```

Pair with `ListItem` rows for menus, or any content for filter panels. Placement: top/bottom/left/right.
