import * as React from "react";
export interface ProgressProps {
  /** 0–100. Omit for an indeterminate animation. */
  value?: number;
  /** @default "linear" */
  variant?: "linear" | "circular";
  /** @default "primary" */
  tone?: "primary" | "brand" | "success" | "info";
  /** Circular diameter in px. @default 40 */
  size?: number;
  /** Stroke / bar thickness. @default 4 */
  thickness?: number;
  showLabel?: boolean;
}
/** Linear bar or circular ring progress; determinate or indeterminate. */
export declare function Progress(props: ProgressProps): JSX.Element;
