import * as React from "react";
export interface SnackbarProps {
  message: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}
export interface SnackbarStackItem {
  id: string | number;
  message: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}
export interface SnackbarStackProps {
  items: SnackbarStackItem[];
  onClose?: (id: string | number) => void;
  /** @default "bottom-left" */
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}
/** Compact dark transient message; SnackbarStack manages a fixed-position stack. */
export declare function Snackbar(props: SnackbarProps): JSX.Element;
export declare function SnackbarStack(props: SnackbarStackProps): JSX.Element;
