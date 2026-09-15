import * as React from "react";
/** Pastille de filtre à bord arrondi ; sélectionnée, elle passe en rouge. */
export interface ChipProps {
  children?: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
export declare function Chip(props: ChipProps): JSX.Element;
