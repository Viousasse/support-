Ligne de notification pour un panneau déroulant — icône de ton, titre, corps, horodatage, et fond marqué si non lue.

```jsx
<NotificationItem tone="success" unread time="il y a 5 h"
  icon={<Icon name="Check" size={18} />}
  title="Rapport validé" body="Le rapport passe en production." onClick={ouvrir} />
```

`StatusDot` est exporté depuis le même fichier : pastille de présence `online` / `busy` / `away` / `offline`, avec `ring` pour la poser sur un avatar et `pulse` pour l'animer.

Prévoyez au moins 4 px entre deux lignes : deux fonds « non lu » collés se lisent comme un seul bloc.