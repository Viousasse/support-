import * as React from "react";
export interface KbdProps {
  /** A combo like "Ctrl+K" — split into individual keys */
  combo?: string;
  /** A single key (when combo is not given) */
  children?: React.ReactNode;
}
/** Keyboard key indicator; pass `combo="Ctrl+K"` or a single key as children. */
export declare function Kbd(props: KbdProps): JSX.Element;
