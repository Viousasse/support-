import * as React from "react";
export interface DescriptionItem { term: React.ReactNode; value: React.ReactNode; }
export interface DescriptionListProps {
  items: DescriptionItem[];
  /** @default "rows" */
  layout?: "rows" | "stacked";
}
/** Key/value detail rows for detail panels and drawers. */
export declare function DescriptionList(props: DescriptionListProps): JSX.Element;
