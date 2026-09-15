import * as React from "react";
export interface PlaceholderProps {
  /** @default "slot" */
  variant?: "slot" | "skeleton";
  /** Label for the dashed slot variant */
  label?: string;
  width?: number | string;
  height?: number | string;
  /** Render N stacked skeleton text bars instead of a block */
  lines?: number;
  radius?: string;
}
/** Layout slot (dashed box) or loading skeleton (shimmer block / text lines). */
export declare function Placeholder(props: PlaceholderProps): JSX.Element;
