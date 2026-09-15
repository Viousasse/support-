import * as React from "react";
export interface ModalProps {
  open?: boolean;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
}
/** Centered dialog over a dimmed overlay, with header, body and footer slots. */
export declare function Modal(props: ModalProps): JSX.Element;
