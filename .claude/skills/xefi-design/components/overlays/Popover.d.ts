import * as React from "react";
export interface PopoverProps {
  /** The clickable trigger element */
  trigger: React.ReactNode;
  /** @default "bottom" */
  placement?: "top" | "bottom" | "left" | "right";
  /** Show the pointing arrow. @default true */
  arrow?: boolean;
  children?: React.ReactNode;
}
/** Click-triggered floating panel with an optional arrow; closes on outside click. */
export declare function Popover(props: PopoverProps): JSX.Element;
