import * as React from "react";
/** Badge de statut d'une note de frais — les six statuts du kit. */
export interface BadgeProps {
  status?: "validee" | "soumise" | "corrigee" | "refusee" | "brouillon" | "enpaie";
  /** Libellé personnalisé ; par défaut le libellé français du statut */
  children?: React.ReactNode;
  className?: string;
}
export declare function Badge(props: BadgeProps): JSX.Element;
