import * as React from "react";
export interface MenuItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  /** "danger" renders the item in brand red */
  tone?: "default" | "danger";
  disabled?: boolean;
  /** Render a separator line instead of an item */
  divider?: boolean;
}
export interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  /** Anchor edge. @default "left" */
  align?: "left" | "right";
  /** Monte le panneau déjà ouvert — pour les planches et les vignettes, où aucun clic n'a lieu. */
  defaultOpen?: boolean;
}
/** Dropdown action menu opened from a trigger; closes on outside click. */
export declare function Menu(props: MenuProps): JSX.Element;
