import * as React from "react";
export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  /** Line/dot/area color (CSS value) */
  stroke?: string;
  fill?: boolean;
  dot?: boolean;
  strokeWidth?: number;
}
/** Tiny inline trend chart (polyline + area fill + end dot). Pairs with StatCard. */
export declare function Sparkline(props: SparklineProps): JSX.Element;
