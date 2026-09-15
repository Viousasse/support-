import * as React from "react";
/** Barre supérieure blanche : logo, séparateur, titre de page, actions et utilisateur à droite. */
export interface TopBarProps {
  title?: React.ReactNode;
  user?: React.ReactNode;
  actions?: React.ReactNode;
  basePath?: string;
  className?: string;
}
export declare function TopBar(props: TopBarProps): JSX.Element;
