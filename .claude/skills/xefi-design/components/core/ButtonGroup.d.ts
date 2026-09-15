import * as React from "react";
export interface ButtonGroupItem { id: string; label: React.ReactNode; icon?: React.ReactNode; }
export interface ButtonGroupProps {
  items: ButtonGroupItem[];
  value?: string;
  onChange?: (id: string) => void;
  /** @default "md" */
  /** Hauteur du segment : s 30 / md 36 / l 40 — échelle du socle. */
  size?: "s" | "md" | "l";
}
/** Joined segmented buttons for a single-select toolbar (pill-capsule). */
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
