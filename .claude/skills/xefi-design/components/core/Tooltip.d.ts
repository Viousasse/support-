import * as React from "react";
/** Info-bulle sombre avec flèche, au-dessus ou au-dessous de la cible. */
export interface TooltipProps {
  label: React.ReactNode;
  placement?: "top" | "bottom";
  children?: React.ReactNode;
  className?: string;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
