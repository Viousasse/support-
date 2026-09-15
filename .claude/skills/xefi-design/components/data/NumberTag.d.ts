import * as React from "react";
export interface NumberTagProps {
  value?: number | string;
  /** @default "boxed" */
  variant?: "boxed" | "plain";
  /** @default "neutral" */
  tone?: "neutral" | "brand" | "dark";
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
/** Compact bold numeric chip (the "123" element) — key, count or list index. */
export declare function NumberTag(props: NumberTagProps): JSX.Element;
