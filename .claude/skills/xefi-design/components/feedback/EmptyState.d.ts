import * as React from "react";
/** État vide : pastille rouge-50, titre, phrase d'explication, une seule action. */
export interface EmptyStateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
