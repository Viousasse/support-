import * as React from "react";
/** Bouton carré ne contenant qu'une icône (barres d'outils, lignes de datagrid). */
export interface IconButtonProps {
  icon: React.ReactNode;
  /** Libellé accessible — obligatoire, l'icône seule ne suffit pas */
  label: string;
  size?: 30 | 36 | 40 | 48;
  variant?: "default" | "ghost";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
