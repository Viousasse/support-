import * as React from "react";
export interface ContextualButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Which row action. @default "note" */
  kind?: "check" | "close" | "history" | "note" | "window-close";
  /** Show the tinted active fill (also shown on hover) */
  active?: boolean;
  /** Square size in px. @default 36 */
  size?: number;
  disabled?: boolean;
  "aria-label"?: string;
}
/**
 * Compact contextual row action (validate / reject / history / note / dismiss)
 * with a tone-tinted active state. Covers the Figma Btn/* set.
 */
export declare function ContextualButton(props: ContextualButtonProps): JSX.Element;
