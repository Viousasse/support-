import * as React from "react";
/** Modale de confirmation : titre 18, texte gris, action neutre puis action rouge. */
export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
