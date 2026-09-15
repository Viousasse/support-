import * as React from "react";
export interface BannerProps {
  title?: string;
  children?: React.ReactNode;
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "error" | "brand";
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}
/**
 * Persistent inline alert bar — tone-tinted surface + border, optional action/dismiss.
 * @startingPoint section="Feedback" subtitle="Inline alert banner" viewport="700x120"
 */
export declare function Banner(props: BannerProps): JSX.Element;
