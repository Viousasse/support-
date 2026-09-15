import * as React from "react";
export interface DividerProps {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Centered label (horizontal only) */
  label?: string;
}
/** Hairline separator, horizontal or vertical, with an optional centered label. */
export declare function Divider(props: DividerProps): JSX.Element;
