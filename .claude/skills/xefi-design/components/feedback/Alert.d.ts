import * as React from "react";
/** Notification en carte blanche, barre de couleur à gauche selon le ton. */
export interface AlertProps {
  tone?: "success" | "error" | "warning" | "info";
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}
export declare function Alert(props: AlertProps): JSX.Element;
