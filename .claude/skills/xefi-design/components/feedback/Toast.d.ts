import * as React from "react";
export interface ToastProps {
  title?: string;
  description?: string;
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "error" | "brand";
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}
/**
 * Transient notification with tone-tinted icon, optional action and dismiss.
 * @startingPoint section="Feedback" subtitle="Notification toast with action" viewport="700x150"
 */
export declare function Toast(props: ToastProps): JSX.Element;
