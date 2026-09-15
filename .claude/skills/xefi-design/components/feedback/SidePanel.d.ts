import * as React from "react";
/** Volet latéral droit — l'ombre 0 4 20 du kit lui est réservée. */
export interface SidePanelProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  className?: string;
}
export declare function SidePanel(props: SidePanelProps): JSX.Element | null;
