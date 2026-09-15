import * as React from "react";
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
/** A single list/menu row: leading visual, title + subtitle, trailing slot. */
export declare function ListItem(props: ListItemProps): JSX.Element;
