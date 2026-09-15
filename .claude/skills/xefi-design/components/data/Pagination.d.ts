import * as React from "react";
/** Pagination sous un datagrid ; la page courante est un carré rouge. */
export interface PaginationProps {
  total?: number;
  page?: number;
  onChange?: (page: number) => void;
  /** Variante réduite : seulement la page courante */
  compact?: boolean;
  className?: string;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
